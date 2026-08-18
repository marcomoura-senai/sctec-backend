import { createHash } from 'crypto';

import { NamingStrategyInterface, Table, View } from 'typeorm';

/** Postgres trunca identificadores em 63 bytes; acima disso o final é ignorado
 * silenciosamente, o que pode gerar colisões entre nomes distintos. */
const POSTGRES_IDENTIFIER_MAX_LENGTH = 63;

/** Converte camelCase/PascalCase em snake_case (ex.: "OrderItem" -> "order_item"). */
function toSnakeCase(value: string): string {
  return value
    .replace(/([A-Z])([A-Z])([a-z])/g, '$1_$2$3')
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();
}

/** Junta partes de identificador e normaliza o resultado em snake_case. */
function joinSnakeCase(...parts: string[]): string {
  return toSnakeCase(parts.filter(Boolean).join('_'));
}

/** Reduz uma expressão SQL arbitrária (ex.: de um CHECK) a um segmento de identificador válido. */
function toIdentifierSegment(expression: string): string {
  return toSnakeCase(expression.replace(/[^a-zA-Z0-9]+/g, '_'))
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
}

/** Se o identificador ultrapassar o limite do Postgres, trunca e anexa um hash curto
 * para preservar unicidade. */
function fitIdentifierLength(identifier: string): string {
  if (identifier.length <= POSTGRES_IDENTIFIER_MAX_LENGTH) {
    return identifier;
  }
  const hashSuffix = createHash('sha1')
    .update(identifier)
    .digest('hex')
    .slice(0, 8);
  const maxBaseLength = POSTGRES_IDENTIFIER_MAX_LENGTH - hashSuffix.length - 1;
  return `${identifier.slice(0, maxBaseLength)}_${hashSuffix}`;
}

function getTableName(tableOrName: Table | View | string): string {
  const name = typeof tableOrName === 'string' ? tableOrName : tableOrName.name;
  const segments = name.split('.');
  return segments[segments.length - 1] ?? name;
}

/** Ordena os nomes de coluna para que a mesma combinação sempre gere o mesmo
 * nome de constraint, independente da ordem em que foram declaradas. */
function sortedColumnNames(columnNames: string[]): string[] {
  return [...columnNames].sort();
}

/**
 * Estratégia de nomenclatura que traduz identificadores camelCase do TypeScript
 * para snake_case, seguindo as convenções padrão de bancos relacionais (SQL),
 * incluindo prefixos legíveis para constraints (pk_, fk_, uq_, idx_, ck_, df_, xcl_, rel_).
 */
export class SnakeCaseNamingStrategy implements NamingStrategyInterface {
  materializedPathColumnName = 'mpath';

  nestedSetColumnNames = { left: 'nsleft', right: 'nsright' };

  tableName(targetName: string, userSpecifiedName: string | undefined): string {
    return userSpecifiedName ?? toSnakeCase(targetName);
  }

  closureJunctionTableName(originalClosureTableName: string): string {
    return `${originalClosureTableName}_closure`;
  }

  columnName(
    propertyName: string,
    customName: string | undefined,
    embeddedPrefixes: string[],
  ): string {
    return joinSnakeCase(...embeddedPrefixes, customName ?? propertyName);
  }

  relationName(propertyName: string): string {
    return toSnakeCase(propertyName);
  }

  primaryKeyName(tableOrName: Table | string, _columnNames: string[]): string {
    const tableName = getTableName(tableOrName);
    return fitIdentifierLength(`pk_${tableName}`);
  }

  uniqueConstraintName(
    tableOrName: Table | string,
    columnNames: string[],
  ): string {
    const tableName = getTableName(tableOrName);
    const columns = sortedColumnNames(columnNames).join('_');
    return fitIdentifierLength(`uq_${tableName}_${columns}`);
  }

  relationConstraintName(
    tableOrName: Table | string,
    columnNames: string[],
    where?: string,
  ): string {
    const tableName = getTableName(tableOrName);
    const columns = sortedColumnNames(columnNames).join('_');
    const suffix = where ? `_${toIdentifierSegment(where)}` : '';
    return fitIdentifierLength(`rel_${tableName}_${columns}${suffix}`);
  }

  defaultConstraintName(
    tableOrName: Table | string,
    columnName: string,
  ): string {
    const tableName = getTableName(tableOrName);
    return fitIdentifierLength(`df_${tableName}_${columnName}`);
  }

  foreignKeyName(
    tableOrName: Table | string,
    columnNames: string[],
    _referencedTablePath?: string,
    _referencedColumnNames?: string[],
  ): string {
    const tableName = getTableName(tableOrName);
    const columns = sortedColumnNames(columnNames).join('_');
    return fitIdentifierLength(`fk_${tableName}_${columns}`);
  }

  indexName(
    tableOrName: Table | View | string,
    columns: string[],
    where?: string,
  ): string {
    const tableName = getTableName(tableOrName);
    const columnList = sortedColumnNames(columns).join('_');
    const suffix = where ? `_${toIdentifierSegment(where)}` : '';
    return fitIdentifierLength(`idx_${tableName}_${columnList}${suffix}`);
  }

  checkConstraintName(
    tableOrName: Table | string,
    expression: string,
    isEnum?: boolean,
  ): string {
    const tableName = getTableName(tableOrName);
    const name = fitIdentifierLength(
      `ck_${tableName}_${toIdentifierSegment(expression)}`,
    );
    return isEnum ? `${name}_enum` : name;
  }

  exclusionConstraintName(
    tableOrName: Table | string,
    expression: string,
  ): string {
    const tableName = getTableName(tableOrName);
    return fitIdentifierLength(
      `xcl_${tableName}_${toIdentifierSegment(expression)}`,
    );
  }

  joinColumnName(relationName: string, referencedColumnName: string): string {
    return joinSnakeCase(relationName, referencedColumnName);
  }

  joinTableName(
    firstTableName: string,
    secondTableName: string,
    firstPropertyName: string,
    _secondPropertyName: string,
  ): string {
    return toSnakeCase(
      `${firstTableName}_${firstPropertyName.replace(/\./g, '_')}_${secondTableName}`,
    );
  }

  joinTableColumnDuplicationPrefix(columnName: string, index: number): string {
    return `${columnName}_${index.toString()}`;
  }

  joinTableColumnName(
    tableName: string,
    propertyName: string,
    columnName?: string,
  ): string {
    return joinSnakeCase(tableName, columnName ?? propertyName);
  }

  joinTableInverseColumnName(
    tableName: string,
    propertyName: string,
    columnName?: string,
  ): string {
    return this.joinTableColumnName(tableName, propertyName, columnName);
  }

  prefixTableName(prefix: string, tableName: string): string {
    return `${prefix}${tableName}`;
  }
}
