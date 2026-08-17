import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

export async function parseToInstance<T extends object>(
  object: unknown,
  target: ClassConstructor<T>,
): Promise<T> {
  const instance = plainToInstance(target, object);
  await validateOrReject(instance, {
    skipMissingProperties: true,
    whitelist: true,
  });
  // TODO: Format the errors
  return instance;
}
