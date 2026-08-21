
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Player
 * 
 */
export type Player = $Result.DefaultSelection<Prisma.$PlayerPayload>
/**
 * Model Ticket
 * 
 */
export type Ticket = $Result.DefaultSelection<Prisma.$TicketPayload>
/**
 * Model TicketTemplate
 * 
 */
export type TicketTemplate = $Result.DefaultSelection<Prisma.$TicketTemplatePayload>
/**
 * Model PvPAttack
 * 
 */
export type PvPAttack = $Result.DefaultSelection<Prisma.$PvPAttackPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Verification
 * 
 */
export type Verification = $Result.DefaultSelection<Prisma.$VerificationPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const CareerPath: {
  NETWORK: 'NETWORK',
  SYSTEMS: 'SYSTEMS',
  SECURITY: 'SECURITY'
};

export type CareerPath = (typeof CareerPath)[keyof typeof CareerPath]


export const TicketCategory: {
  SERVICE_DESK: 'SERVICE_DESK',
  NETWORK: 'NETWORK',
  SYSTEMS: 'SYSTEMS',
  SECURITY: 'SECURITY'
};

export type TicketCategory = (typeof TicketCategory)[keyof typeof TicketCategory]


export const TicketSeverity: {
  P1: 'P1',
  P2: 'P2',
  P3: 'P3',
  P4: 'P4'
};

export type TicketSeverity = (typeof TicketSeverity)[keyof typeof TicketSeverity]


export const TicketStatus: {
  OPEN: 'OPEN',
  RESOLVED: 'RESOLVED',
  BOUNCED: 'BOUNCED',
  FAILED: 'FAILED',
  EXPIRED: 'EXPIRED'
};

export type TicketStatus = (typeof TicketStatus)[keyof typeof TicketStatus]


export const PvPAttackType: {
  PASSWORD_RESET_FLOOD: 'PASSWORD_RESET_FLOOD',
  NETWORK_OUTAGE: 'NETWORK_OUTAGE',
  FAILED_DEPLOYMENT: 'FAILED_DEPLOYMENT',
  PHISHING_CAMPAIGN: 'PHISHING_CAMPAIGN',
  TICKET_STORM: 'TICKET_STORM',
  MAJOR_INCIDENT: 'MAJOR_INCIDENT'
};

export type PvPAttackType = (typeof PvPAttackType)[keyof typeof PvPAttackType]


export const PvPAttackStatus: {
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
};

export type PvPAttackStatus = (typeof PvPAttackStatus)[keyof typeof PvPAttackStatus]

}

export type CareerPath = $Enums.CareerPath

export const CareerPath: typeof $Enums.CareerPath

export type TicketCategory = $Enums.TicketCategory

export const TicketCategory: typeof $Enums.TicketCategory

export type TicketSeverity = $Enums.TicketSeverity

export const TicketSeverity: typeof $Enums.TicketSeverity

export type TicketStatus = $Enums.TicketStatus

export const TicketStatus: typeof $Enums.TicketStatus

export type PvPAttackType = $Enums.PvPAttackType

export const PvPAttackType: typeof $Enums.PvPAttackType

export type PvPAttackStatus = $Enums.PvPAttackStatus

export const PvPAttackStatus: typeof $Enums.PvPAttackStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Players
 * const players = await prisma.player.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Players
   * const players = await prisma.player.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.PrismaClientConstructorArgs<ClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.player`: Exposes CRUD operations for the **Player** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Players
    * const players = await prisma.player.findMany()
    * ```
    */
  get player(): Prisma.PlayerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ticket`: Exposes CRUD operations for the **Ticket** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tickets
    * const tickets = await prisma.ticket.findMany()
    * ```
    */
  get ticket(): Prisma.TicketDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ticketTemplate`: Exposes CRUD operations for the **TicketTemplate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TicketTemplates
    * const ticketTemplates = await prisma.ticketTemplate.findMany()
    * ```
    */
  get ticketTemplate(): Prisma.TicketTemplateDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pvPAttack`: Exposes CRUD operations for the **PvPAttack** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PvPAttacks
    * const pvPAttacks = await prisma.pvPAttack.findMany()
    * ```
    */
  get pvPAttack(): Prisma.PvPAttackDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verification`: Exposes CRUD operations for the **Verification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Verifications
    * const verifications = await prisma.verification.findMany()
    * ```
    */
  get verification(): Prisma.VerificationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.9.1
   * Query Engine version: e922089b7d7502aff4249d5da3420f6fa55fc6ad
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * Resolved type of the argument passed to the `PrismaClient` constructor.
   *
   * When called without a narrower options type (the common case), this resolves
   * to `PrismaClientOptions` directly, which produces a clear TypeScript error
   * message (`not assignable to parameter of type 'PrismaClientOptions'`) when
   * the argument is missing or incomplete. When the user supplies a narrower
   * options type (e.g. via a literal), it falls back to `Subset` to keep
   * filtering out unknown properties.
   */
  export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> =
    [PrismaClientOptions] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      ((Without<T, U> & U) | (Without<U, T> & T)) & object
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Player: 'Player',
    Ticket: 'Ticket',
    TicketTemplate: 'TicketTemplate',
    PvPAttack: 'PvPAttack',
    User: 'User',
    Session: 'Session',
    Account: 'Account',
    Verification: 'Verification'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "player" | "ticket" | "ticketTemplate" | "pvPAttack" | "user" | "session" | "account" | "verification"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Player: {
        payload: Prisma.$PlayerPayload<ExtArgs>
        fields: Prisma.PlayerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlayerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlayerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          findFirst: {
            args: Prisma.PlayerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlayerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          findMany: {
            args: Prisma.PlayerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>[]
          }
          create: {
            args: Prisma.PlayerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          createMany: {
            args: Prisma.PlayerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlayerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>[]
          }
          delete: {
            args: Prisma.PlayerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          update: {
            args: Prisma.PlayerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          deleteMany: {
            args: Prisma.PlayerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlayerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlayerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>[]
          }
          upsert: {
            args: Prisma.PlayerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          aggregate: {
            args: Prisma.PlayerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlayer>
          }
          groupBy: {
            args: Prisma.PlayerGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlayerGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlayerCountArgs<ExtArgs>
            result: $Utils.Optional<PlayerCountAggregateOutputType> | number
          }
        }
      }
      Ticket: {
        payload: Prisma.$TicketPayload<ExtArgs>
        fields: Prisma.TicketFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TicketFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TicketFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          findFirst: {
            args: Prisma.TicketFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TicketFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          findMany: {
            args: Prisma.TicketFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>[]
          }
          create: {
            args: Prisma.TicketCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          createMany: {
            args: Prisma.TicketCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TicketCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>[]
          }
          delete: {
            args: Prisma.TicketDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          update: {
            args: Prisma.TicketUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          deleteMany: {
            args: Prisma.TicketDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TicketUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TicketUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>[]
          }
          upsert: {
            args: Prisma.TicketUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketPayload>
          }
          aggregate: {
            args: Prisma.TicketAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTicket>
          }
          groupBy: {
            args: Prisma.TicketGroupByArgs<ExtArgs>
            result: $Utils.Optional<TicketGroupByOutputType>[]
          }
          count: {
            args: Prisma.TicketCountArgs<ExtArgs>
            result: $Utils.Optional<TicketCountAggregateOutputType> | number
          }
        }
      }
      TicketTemplate: {
        payload: Prisma.$TicketTemplatePayload<ExtArgs>
        fields: Prisma.TicketTemplateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TicketTemplateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketTemplatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TicketTemplateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketTemplatePayload>
          }
          findFirst: {
            args: Prisma.TicketTemplateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketTemplatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TicketTemplateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketTemplatePayload>
          }
          findMany: {
            args: Prisma.TicketTemplateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketTemplatePayload>[]
          }
          create: {
            args: Prisma.TicketTemplateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketTemplatePayload>
          }
          createMany: {
            args: Prisma.TicketTemplateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TicketTemplateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketTemplatePayload>[]
          }
          delete: {
            args: Prisma.TicketTemplateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketTemplatePayload>
          }
          update: {
            args: Prisma.TicketTemplateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketTemplatePayload>
          }
          deleteMany: {
            args: Prisma.TicketTemplateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TicketTemplateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TicketTemplateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketTemplatePayload>[]
          }
          upsert: {
            args: Prisma.TicketTemplateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TicketTemplatePayload>
          }
          aggregate: {
            args: Prisma.TicketTemplateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTicketTemplate>
          }
          groupBy: {
            args: Prisma.TicketTemplateGroupByArgs<ExtArgs>
            result: $Utils.Optional<TicketTemplateGroupByOutputType>[]
          }
          count: {
            args: Prisma.TicketTemplateCountArgs<ExtArgs>
            result: $Utils.Optional<TicketTemplateCountAggregateOutputType> | number
          }
        }
      }
      PvPAttack: {
        payload: Prisma.$PvPAttackPayload<ExtArgs>
        fields: Prisma.PvPAttackFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PvPAttackFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PvPAttackPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PvPAttackFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PvPAttackPayload>
          }
          findFirst: {
            args: Prisma.PvPAttackFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PvPAttackPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PvPAttackFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PvPAttackPayload>
          }
          findMany: {
            args: Prisma.PvPAttackFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PvPAttackPayload>[]
          }
          create: {
            args: Prisma.PvPAttackCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PvPAttackPayload>
          }
          createMany: {
            args: Prisma.PvPAttackCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PvPAttackCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PvPAttackPayload>[]
          }
          delete: {
            args: Prisma.PvPAttackDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PvPAttackPayload>
          }
          update: {
            args: Prisma.PvPAttackUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PvPAttackPayload>
          }
          deleteMany: {
            args: Prisma.PvPAttackDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PvPAttackUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PvPAttackUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PvPAttackPayload>[]
          }
          upsert: {
            args: Prisma.PvPAttackUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PvPAttackPayload>
          }
          aggregate: {
            args: Prisma.PvPAttackAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePvPAttack>
          }
          groupBy: {
            args: Prisma.PvPAttackGroupByArgs<ExtArgs>
            result: $Utils.Optional<PvPAttackGroupByOutputType>[]
          }
          count: {
            args: Prisma.PvPAttackCountArgs<ExtArgs>
            result: $Utils.Optional<PvPAttackCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Verification: {
        payload: Prisma.$VerificationPayload<ExtArgs>
        fields: Prisma.VerificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          findFirst: {
            args: Prisma.VerificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          findMany: {
            args: Prisma.VerificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          create: {
            args: Prisma.VerificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          createMany: {
            args: Prisma.VerificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          delete: {
            args: Prisma.VerificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          update: {
            args: Prisma.VerificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          deleteMany: {
            args: Prisma.VerificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          upsert: {
            args: Prisma.VerificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          aggregate: {
            args: Prisma.VerificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerification>
          }
          groupBy: {
            args: Prisma.VerificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * A driver adapter that PrismaClient uses to connect to your database, such as the ones provided by `@prisma/adapter-pg`, `@prisma/adapter-libsql`, `@prisma/adapter-planetscale`, etc.
     * 
     * A driver adapter is **required** unless you connect to your database through Prisma Accelerate (in which case use `accelerateUrl` instead).
     * 
     * Learn more: https://pris.ly/d/driver-adapters
     * 
     * @example
     * ```ts
     * import { PrismaPg } from '@prisma/adapter-pg'
     * import { PrismaClient } from './generated/prisma/client'
     * 
     * const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
     * const prisma = new PrismaClient({ adapter })
     * ```
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * The Prisma Accelerate connection URL. Use this option to connect to your database through Prisma Accelerate instead of using a driver adapter to connect directly.
     * 
     * Learn more: https://pris.ly/d/accelerate
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    player?: PlayerOmit
    ticket?: TicketOmit
    ticketTemplate?: TicketTemplateOmit
    pvPAttack?: PvPAttackOmit
    user?: UserOmit
    session?: SessionOmit
    account?: AccountOmit
    verification?: VerificationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type PlayerCountOutputType
   */

  export type PlayerCountOutputType = {
    attacksSent: number
    attacksReceived: number
    attackTickets: number
    assignedTickets: number
    sentTickets: number
  }

  export type PlayerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attacksSent?: boolean | PlayerCountOutputTypeCountAttacksSentArgs
    attacksReceived?: boolean | PlayerCountOutputTypeCountAttacksReceivedArgs
    attackTickets?: boolean | PlayerCountOutputTypeCountAttackTicketsArgs
    assignedTickets?: boolean | PlayerCountOutputTypeCountAssignedTicketsArgs
    sentTickets?: boolean | PlayerCountOutputTypeCountSentTicketsArgs
  }

  // Custom InputTypes
  /**
   * PlayerCountOutputType without action
   */
  export type PlayerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlayerCountOutputType
     */
    select?: PlayerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PlayerCountOutputType without action
   */
  export type PlayerCountOutputTypeCountAttacksSentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PvPAttackWhereInput
  }

  /**
   * PlayerCountOutputType without action
   */
  export type PlayerCountOutputTypeCountAttacksReceivedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PvPAttackWhereInput
  }

  /**
   * PlayerCountOutputType without action
   */
  export type PlayerCountOutputTypeCountAttackTicketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketWhereInput
  }

  /**
   * PlayerCountOutputType without action
   */
  export type PlayerCountOutputTypeCountAssignedTicketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketWhereInput
  }

  /**
   * PlayerCountOutputType without action
   */
  export type PlayerCountOutputTypeCountSentTicketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketWhereInput
  }


  /**
   * Count Type PvPAttackCountOutputType
   */

  export type PvPAttackCountOutputType = {
    tickets: number
  }

  export type PvPAttackCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tickets?: boolean | PvPAttackCountOutputTypeCountTicketsArgs
  }

  // Custom InputTypes
  /**
   * PvPAttackCountOutputType without action
   */
  export type PvPAttackCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvPAttackCountOutputType
     */
    select?: PvPAttackCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PvPAttackCountOutputType without action
   */
  export type PvPAttackCountOutputTypeCountTicketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    sessions: number
    accounts: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Player
   */

  export type AggregatePlayer = {
    _count: PlayerCountAggregateOutputType | null
    _avg: PlayerAvgAggregateOutputType | null
    _sum: PlayerSumAggregateOutputType | null
    _min: PlayerMinAggregateOutputType | null
    _max: PlayerMaxAggregateOutputType | null
  }

  export type PlayerAvgAggregateOutputType = {
    id: number | null
    level: number | null
    xp: number | null
    credits: number | null
    kills: number | null
    bankruptcies: number | null
    ticketsResolved: number | null
    correctBounces: number | null
    incorrectBounces: number | null
    incorrectResolves: number | null
    lifetimeCreditsEarned: number | null
    lifetimeTicketsHandled: number | null
  }

  export type PlayerSumAggregateOutputType = {
    id: number | null
    level: number | null
    xp: number | null
    credits: number | null
    kills: number | null
    bankruptcies: number | null
    ticketsResolved: number | null
    correctBounces: number | null
    incorrectBounces: number | null
    incorrectResolves: number | null
    lifetimeCreditsEarned: number | null
    lifetimeTicketsHandled: number | null
  }

  export type PlayerMinAggregateOutputType = {
    id: number | null
    userId: string | null
    username: string | null
    level: number | null
    xp: number | null
    careerPath: $Enums.CareerPath | null
    credits: number | null
    kills: number | null
    bankruptcies: number | null
    ticketsResolved: number | null
    correctBounces: number | null
    incorrectBounces: number | null
    incorrectResolves: number | null
    lifetimeCreditsEarned: number | null
    lifetimeTicketsHandled: number | null
    lastActiveAt: Date | null
    queuePenaltyUntil: Date | null
    nextTicketAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PlayerMaxAggregateOutputType = {
    id: number | null
    userId: string | null
    username: string | null
    level: number | null
    xp: number | null
    careerPath: $Enums.CareerPath | null
    credits: number | null
    kills: number | null
    bankruptcies: number | null
    ticketsResolved: number | null
    correctBounces: number | null
    incorrectBounces: number | null
    incorrectResolves: number | null
    lifetimeCreditsEarned: number | null
    lifetimeTicketsHandled: number | null
    lastActiveAt: Date | null
    queuePenaltyUntil: Date | null
    nextTicketAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PlayerCountAggregateOutputType = {
    id: number
    userId: number
    username: number
    level: number
    xp: number
    careerPath: number
    credits: number
    kills: number
    bankruptcies: number
    ticketsResolved: number
    correctBounces: number
    incorrectBounces: number
    incorrectResolves: number
    lifetimeCreditsEarned: number
    lifetimeTicketsHandled: number
    lastActiveAt: number
    queuePenaltyUntil: number
    nextTicketAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PlayerAvgAggregateInputType = {
    id?: true
    level?: true
    xp?: true
    credits?: true
    kills?: true
    bankruptcies?: true
    ticketsResolved?: true
    correctBounces?: true
    incorrectBounces?: true
    incorrectResolves?: true
    lifetimeCreditsEarned?: true
    lifetimeTicketsHandled?: true
  }

  export type PlayerSumAggregateInputType = {
    id?: true
    level?: true
    xp?: true
    credits?: true
    kills?: true
    bankruptcies?: true
    ticketsResolved?: true
    correctBounces?: true
    incorrectBounces?: true
    incorrectResolves?: true
    lifetimeCreditsEarned?: true
    lifetimeTicketsHandled?: true
  }

  export type PlayerMinAggregateInputType = {
    id?: true
    userId?: true
    username?: true
    level?: true
    xp?: true
    careerPath?: true
    credits?: true
    kills?: true
    bankruptcies?: true
    ticketsResolved?: true
    correctBounces?: true
    incorrectBounces?: true
    incorrectResolves?: true
    lifetimeCreditsEarned?: true
    lifetimeTicketsHandled?: true
    lastActiveAt?: true
    queuePenaltyUntil?: true
    nextTicketAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PlayerMaxAggregateInputType = {
    id?: true
    userId?: true
    username?: true
    level?: true
    xp?: true
    careerPath?: true
    credits?: true
    kills?: true
    bankruptcies?: true
    ticketsResolved?: true
    correctBounces?: true
    incorrectBounces?: true
    incorrectResolves?: true
    lifetimeCreditsEarned?: true
    lifetimeTicketsHandled?: true
    lastActiveAt?: true
    queuePenaltyUntil?: true
    nextTicketAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PlayerCountAggregateInputType = {
    id?: true
    userId?: true
    username?: true
    level?: true
    xp?: true
    careerPath?: true
    credits?: true
    kills?: true
    bankruptcies?: true
    ticketsResolved?: true
    correctBounces?: true
    incorrectBounces?: true
    incorrectResolves?: true
    lifetimeCreditsEarned?: true
    lifetimeTicketsHandled?: true
    lastActiveAt?: true
    queuePenaltyUntil?: true
    nextTicketAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PlayerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Player to aggregate.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Players
    **/
    _count?: true | PlayerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlayerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlayerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlayerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlayerMaxAggregateInputType
  }

  export type GetPlayerAggregateType<T extends PlayerAggregateArgs> = {
        [P in keyof T & keyof AggregatePlayer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlayer[P]>
      : GetScalarType<T[P], AggregatePlayer[P]>
  }




  export type PlayerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlayerWhereInput
    orderBy?: PlayerOrderByWithAggregationInput | PlayerOrderByWithAggregationInput[]
    by: PlayerScalarFieldEnum[] | PlayerScalarFieldEnum
    having?: PlayerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlayerCountAggregateInputType | true
    _avg?: PlayerAvgAggregateInputType
    _sum?: PlayerSumAggregateInputType
    _min?: PlayerMinAggregateInputType
    _max?: PlayerMaxAggregateInputType
  }

  export type PlayerGroupByOutputType = {
    id: number
    userId: string
    username: string
    level: number
    xp: number
    careerPath: $Enums.CareerPath | null
    credits: number
    kills: number
    bankruptcies: number
    ticketsResolved: number
    correctBounces: number
    incorrectBounces: number
    incorrectResolves: number
    lifetimeCreditsEarned: number
    lifetimeTicketsHandled: number
    lastActiveAt: Date
    queuePenaltyUntil: Date | null
    nextTicketAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: PlayerCountAggregateOutputType | null
    _avg: PlayerAvgAggregateOutputType | null
    _sum: PlayerSumAggregateOutputType | null
    _min: PlayerMinAggregateOutputType | null
    _max: PlayerMaxAggregateOutputType | null
  }

  type GetPlayerGroupByPayload<T extends PlayerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlayerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlayerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlayerGroupByOutputType[P]>
            : GetScalarType<T[P], PlayerGroupByOutputType[P]>
        }
      >
    >


  export type PlayerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    username?: boolean
    level?: boolean
    xp?: boolean
    careerPath?: boolean
    credits?: boolean
    kills?: boolean
    bankruptcies?: boolean
    ticketsResolved?: boolean
    correctBounces?: boolean
    incorrectBounces?: boolean
    incorrectResolves?: boolean
    lifetimeCreditsEarned?: boolean
    lifetimeTicketsHandled?: boolean
    lastActiveAt?: boolean
    queuePenaltyUntil?: boolean
    nextTicketAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    attacksSent?: boolean | Player$attacksSentArgs<ExtArgs>
    attacksReceived?: boolean | Player$attacksReceivedArgs<ExtArgs>
    attackTickets?: boolean | Player$attackTicketsArgs<ExtArgs>
    assignedTickets?: boolean | Player$assignedTicketsArgs<ExtArgs>
    sentTickets?: boolean | Player$sentTicketsArgs<ExtArgs>
    _count?: boolean | PlayerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["player"]>

  export type PlayerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    username?: boolean
    level?: boolean
    xp?: boolean
    careerPath?: boolean
    credits?: boolean
    kills?: boolean
    bankruptcies?: boolean
    ticketsResolved?: boolean
    correctBounces?: boolean
    incorrectBounces?: boolean
    incorrectResolves?: boolean
    lifetimeCreditsEarned?: boolean
    lifetimeTicketsHandled?: boolean
    lastActiveAt?: boolean
    queuePenaltyUntil?: boolean
    nextTicketAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["player"]>

  export type PlayerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    username?: boolean
    level?: boolean
    xp?: boolean
    careerPath?: boolean
    credits?: boolean
    kills?: boolean
    bankruptcies?: boolean
    ticketsResolved?: boolean
    correctBounces?: boolean
    incorrectBounces?: boolean
    incorrectResolves?: boolean
    lifetimeCreditsEarned?: boolean
    lifetimeTicketsHandled?: boolean
    lastActiveAt?: boolean
    queuePenaltyUntil?: boolean
    nextTicketAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["player"]>

  export type PlayerSelectScalar = {
    id?: boolean
    userId?: boolean
    username?: boolean
    level?: boolean
    xp?: boolean
    careerPath?: boolean
    credits?: boolean
    kills?: boolean
    bankruptcies?: boolean
    ticketsResolved?: boolean
    correctBounces?: boolean
    incorrectBounces?: boolean
    incorrectResolves?: boolean
    lifetimeCreditsEarned?: boolean
    lifetimeTicketsHandled?: boolean
    lastActiveAt?: boolean
    queuePenaltyUntil?: boolean
    nextTicketAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PlayerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "username" | "level" | "xp" | "careerPath" | "credits" | "kills" | "bankruptcies" | "ticketsResolved" | "correctBounces" | "incorrectBounces" | "incorrectResolves" | "lifetimeCreditsEarned" | "lifetimeTicketsHandled" | "lastActiveAt" | "queuePenaltyUntil" | "nextTicketAt" | "createdAt" | "updatedAt", ExtArgs["result"]["player"]>
  export type PlayerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    attacksSent?: boolean | Player$attacksSentArgs<ExtArgs>
    attacksReceived?: boolean | Player$attacksReceivedArgs<ExtArgs>
    attackTickets?: boolean | Player$attackTicketsArgs<ExtArgs>
    assignedTickets?: boolean | Player$assignedTicketsArgs<ExtArgs>
    sentTickets?: boolean | Player$sentTicketsArgs<ExtArgs>
    _count?: boolean | PlayerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PlayerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PlayerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PlayerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Player"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      attacksSent: Prisma.$PvPAttackPayload<ExtArgs>[]
      attacksReceived: Prisma.$PvPAttackPayload<ExtArgs>[]
      attackTickets: Prisma.$TicketPayload<ExtArgs>[]
      assignedTickets: Prisma.$TicketPayload<ExtArgs>[]
      sentTickets: Prisma.$TicketPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: string
      username: string
      level: number
      xp: number
      careerPath: $Enums.CareerPath | null
      credits: number
      kills: number
      bankruptcies: number
      ticketsResolved: number
      correctBounces: number
      incorrectBounces: number
      incorrectResolves: number
      lifetimeCreditsEarned: number
      lifetimeTicketsHandled: number
      lastActiveAt: Date
      queuePenaltyUntil: Date | null
      nextTicketAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["player"]>
    composites: {}
  }

  type PlayerGetPayload<S extends boolean | null | undefined | PlayerDefaultArgs> = $Result.GetResult<Prisma.$PlayerPayload, S>

  type PlayerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlayerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlayerCountAggregateInputType | true
    }

  export interface PlayerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Player'], meta: { name: 'Player' } }
    /**
     * Find zero or one Player that matches the filter.
     * @param {PlayerFindUniqueArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlayerFindUniqueArgs>(args: SelectSubset<T, PlayerFindUniqueArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Player that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlayerFindUniqueOrThrowArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlayerFindUniqueOrThrowArgs>(args: SelectSubset<T, PlayerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Player that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerFindFirstArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlayerFindFirstArgs>(args?: SelectSubset<T, PlayerFindFirstArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Player that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerFindFirstOrThrowArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlayerFindFirstOrThrowArgs>(args?: SelectSubset<T, PlayerFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Players that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Players
     * const players = await prisma.player.findMany()
     * 
     * // Get first 10 Players
     * const players = await prisma.player.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const playerWithIdOnly = await prisma.player.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlayerFindManyArgs>(args?: SelectSubset<T, PlayerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Player.
     * @param {PlayerCreateArgs} args - Arguments to create a Player.
     * @example
     * // Create one Player
     * const Player = await prisma.player.create({
     *   data: {
     *     // ... data to create a Player
     *   }
     * })
     * 
     */
    create<T extends PlayerCreateArgs>(args: SelectSubset<T, PlayerCreateArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Players.
     * @param {PlayerCreateManyArgs} args - Arguments to create many Players.
     * @example
     * // Create many Players
     * const player = await prisma.player.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlayerCreateManyArgs>(args?: SelectSubset<T, PlayerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Players and returns the data saved in the database.
     * @param {PlayerCreateManyAndReturnArgs} args - Arguments to create many Players.
     * @example
     * // Create many Players
     * const player = await prisma.player.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Players and only return the `id`
     * const playerWithIdOnly = await prisma.player.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlayerCreateManyAndReturnArgs>(args?: SelectSubset<T, PlayerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Player.
     * @param {PlayerDeleteArgs} args - Arguments to delete one Player.
     * @example
     * // Delete one Player
     * const Player = await prisma.player.delete({
     *   where: {
     *     // ... filter to delete one Player
     *   }
     * })
     * 
     */
    delete<T extends PlayerDeleteArgs>(args: SelectSubset<T, PlayerDeleteArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Player.
     * @param {PlayerUpdateArgs} args - Arguments to update one Player.
     * @example
     * // Update one Player
     * const player = await prisma.player.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlayerUpdateArgs>(args: SelectSubset<T, PlayerUpdateArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Players.
     * @param {PlayerDeleteManyArgs} args - Arguments to filter Players to delete.
     * @example
     * // Delete a few Players
     * const { count } = await prisma.player.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlayerDeleteManyArgs>(args?: SelectSubset<T, PlayerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Players.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Players
     * const player = await prisma.player.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlayerUpdateManyArgs>(args: SelectSubset<T, PlayerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Players and returns the data updated in the database.
     * @param {PlayerUpdateManyAndReturnArgs} args - Arguments to update many Players.
     * @example
     * // Update many Players
     * const player = await prisma.player.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Players and only return the `id`
     * const playerWithIdOnly = await prisma.player.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PlayerUpdateManyAndReturnArgs>(args: SelectSubset<T, PlayerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Player.
     * @param {PlayerUpsertArgs} args - Arguments to update or create a Player.
     * @example
     * // Update or create a Player
     * const player = await prisma.player.upsert({
     *   create: {
     *     // ... data to create a Player
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Player we want to update
     *   }
     * })
     */
    upsert<T extends PlayerUpsertArgs>(args: SelectSubset<T, PlayerUpsertArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Players.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerCountArgs} args - Arguments to filter Players to count.
     * @example
     * // Count the number of Players
     * const count = await prisma.player.count({
     *   where: {
     *     // ... the filter for the Players we want to count
     *   }
     * })
    **/
    count<T extends PlayerCountArgs>(
      args?: Subset<T, PlayerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlayerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Player.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlayerAggregateArgs>(args: Subset<T, PlayerAggregateArgs>): Prisma.PrismaPromise<GetPlayerAggregateType<T>>

    /**
     * Group by Player.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlayerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlayerGroupByArgs['orderBy'] }
        : { orderBy?: PlayerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlayerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlayerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Player model
   */
  readonly fields: PlayerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Player.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlayerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    attacksSent<T extends Player$attacksSentArgs<ExtArgs> = {}>(args?: Subset<T, Player$attacksSentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PvPAttackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    attacksReceived<T extends Player$attacksReceivedArgs<ExtArgs> = {}>(args?: Subset<T, Player$attacksReceivedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PvPAttackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    attackTickets<T extends Player$attackTicketsArgs<ExtArgs> = {}>(args?: Subset<T, Player$attackTicketsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    assignedTickets<T extends Player$assignedTicketsArgs<ExtArgs> = {}>(args?: Subset<T, Player$assignedTicketsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sentTickets<T extends Player$sentTicketsArgs<ExtArgs> = {}>(args?: Subset<T, Player$sentTicketsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Player model
   */
  interface PlayerFieldRefs {
    readonly id: FieldRef<"Player", 'Int'>
    readonly userId: FieldRef<"Player", 'String'>
    readonly username: FieldRef<"Player", 'String'>
    readonly level: FieldRef<"Player", 'Int'>
    readonly xp: FieldRef<"Player", 'Int'>
    readonly careerPath: FieldRef<"Player", 'CareerPath'>
    readonly credits: FieldRef<"Player", 'Int'>
    readonly kills: FieldRef<"Player", 'Int'>
    readonly bankruptcies: FieldRef<"Player", 'Int'>
    readonly ticketsResolved: FieldRef<"Player", 'Int'>
    readonly correctBounces: FieldRef<"Player", 'Int'>
    readonly incorrectBounces: FieldRef<"Player", 'Int'>
    readonly incorrectResolves: FieldRef<"Player", 'Int'>
    readonly lifetimeCreditsEarned: FieldRef<"Player", 'Int'>
    readonly lifetimeTicketsHandled: FieldRef<"Player", 'Int'>
    readonly lastActiveAt: FieldRef<"Player", 'DateTime'>
    readonly queuePenaltyUntil: FieldRef<"Player", 'DateTime'>
    readonly nextTicketAt: FieldRef<"Player", 'DateTime'>
    readonly createdAt: FieldRef<"Player", 'DateTime'>
    readonly updatedAt: FieldRef<"Player", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Player findUnique
   */
  export type PlayerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player findUniqueOrThrow
   */
  export type PlayerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player findFirst
   */
  export type PlayerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Players.
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Players.
     */
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[]
  }

  /**
   * Player findFirstOrThrow
   */
  export type PlayerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Players.
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Players.
     */
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[]
  }

  /**
   * Player findMany
   */
  export type PlayerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Players to fetch.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Players.
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Players.
     */
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[]
  }

  /**
   * Player create
   */
  export type PlayerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * The data needed to create a Player.
     */
    data: XOR<PlayerCreateInput, PlayerUncheckedCreateInput>
  }

  /**
   * Player createMany
   */
  export type PlayerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Players.
     */
    data: PlayerCreateManyInput | PlayerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Player createManyAndReturn
   */
  export type PlayerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * The data used to create many Players.
     */
    data: PlayerCreateManyInput | PlayerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Player update
   */
  export type PlayerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * The data needed to update a Player.
     */
    data: XOR<PlayerUpdateInput, PlayerUncheckedUpdateInput>
    /**
     * Choose, which Player to update.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player updateMany
   */
  export type PlayerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Players.
     */
    data: XOR<PlayerUpdateManyMutationInput, PlayerUncheckedUpdateManyInput>
    /**
     * Filter which Players to update
     */
    where?: PlayerWhereInput
    /**
     * Limit how many Players to update.
     */
    limit?: number
  }

  /**
   * Player updateManyAndReturn
   */
  export type PlayerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * The data used to update Players.
     */
    data: XOR<PlayerUpdateManyMutationInput, PlayerUncheckedUpdateManyInput>
    /**
     * Filter which Players to update
     */
    where?: PlayerWhereInput
    /**
     * Limit how many Players to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Player upsert
   */
  export type PlayerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * The filter to search for the Player to update in case it exists.
     */
    where: PlayerWhereUniqueInput
    /**
     * In case the Player found by the `where` argument doesn't exist, create a new Player with this data.
     */
    create: XOR<PlayerCreateInput, PlayerUncheckedCreateInput>
    /**
     * In case the Player was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlayerUpdateInput, PlayerUncheckedUpdateInput>
  }

  /**
   * Player delete
   */
  export type PlayerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter which Player to delete.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player deleteMany
   */
  export type PlayerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Players to delete
     */
    where?: PlayerWhereInput
    /**
     * Limit how many Players to delete.
     */
    limit?: number
  }

  /**
   * Player.attacksSent
   */
  export type Player$attacksSentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvPAttack
     */
    select?: PvPAttackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvPAttack
     */
    omit?: PvPAttackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvPAttackInclude<ExtArgs> | null
    where?: PvPAttackWhereInput
    orderBy?: PvPAttackOrderByWithRelationInput | PvPAttackOrderByWithRelationInput[]
    cursor?: PvPAttackWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PvPAttackScalarFieldEnum | PvPAttackScalarFieldEnum[]
  }

  /**
   * Player.attacksReceived
   */
  export type Player$attacksReceivedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvPAttack
     */
    select?: PvPAttackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvPAttack
     */
    omit?: PvPAttackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvPAttackInclude<ExtArgs> | null
    where?: PvPAttackWhereInput
    orderBy?: PvPAttackOrderByWithRelationInput | PvPAttackOrderByWithRelationInput[]
    cursor?: PvPAttackWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PvPAttackScalarFieldEnum | PvPAttackScalarFieldEnum[]
  }

  /**
   * Player.attackTickets
   */
  export type Player$attackTicketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    where?: TicketWhereInput
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    cursor?: TicketWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }

  /**
   * Player.assignedTickets
   */
  export type Player$assignedTicketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    where?: TicketWhereInput
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    cursor?: TicketWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }

  /**
   * Player.sentTickets
   */
  export type Player$sentTicketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    where?: TicketWhereInput
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    cursor?: TicketWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }

  /**
   * Player without action
   */
  export type PlayerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
  }


  /**
   * Model Ticket
   */

  export type AggregateTicket = {
    _count: TicketCountAggregateOutputType | null
    _avg: TicketAvgAggregateOutputType | null
    _sum: TicketSumAggregateOutputType | null
    _min: TicketMinAggregateOutputType | null
    _max: TicketMaxAggregateOutputType | null
  }

  export type TicketAvgAggregateOutputType = {
    id: number | null
    difficulty: number | null
    maxValue: number | null
    baseXp: number | null
    assignedToId: number | null
    lastSentById: number | null
    attackSourcePlayerId: number | null
    pvpAttackId: number | null
    bounceCount: number | null
  }

  export type TicketSumAggregateOutputType = {
    id: number | null
    difficulty: number | null
    maxValue: number | null
    baseXp: number | null
    assignedToId: number | null
    lastSentById: number | null
    attackSourcePlayerId: number | null
    pvpAttackId: number | null
    bounceCount: number | null
  }

  export type TicketMinAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    category: $Enums.TicketCategory | null
    severity: $Enums.TicketSeverity | null
    difficulty: number | null
    status: $Enums.TicketStatus | null
    maxValue: number | null
    baseXp: number | null
    successMessage: string | null
    failureMessage: string | null
    assignedToId: number | null
    lastSentById: number | null
    attackSourcePlayerId: number | null
    pvpAttackId: number | null
    bounceCount: number | null
    abandonmentPenaltyApplied: boolean | null
    abandonmentPenaltyAt: Date | null
    resolvedAt: Date | null
    expiredAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TicketMaxAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    category: $Enums.TicketCategory | null
    severity: $Enums.TicketSeverity | null
    difficulty: number | null
    status: $Enums.TicketStatus | null
    maxValue: number | null
    baseXp: number | null
    successMessage: string | null
    failureMessage: string | null
    assignedToId: number | null
    lastSentById: number | null
    attackSourcePlayerId: number | null
    pvpAttackId: number | null
    bounceCount: number | null
    abandonmentPenaltyApplied: boolean | null
    abandonmentPenaltyAt: Date | null
    resolvedAt: Date | null
    expiredAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TicketCountAggregateOutputType = {
    id: number
    title: number
    description: number
    category: number
    severity: number
    difficulty: number
    status: number
    maxValue: number
    baseXp: number
    successMessage: number
    failureMessage: number
    assignedToId: number
    lastSentById: number
    attackSourcePlayerId: number
    pvpAttackId: number
    bounceCount: number
    abandonmentPenaltyApplied: number
    abandonmentPenaltyAt: number
    resolvedAt: number
    expiredAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TicketAvgAggregateInputType = {
    id?: true
    difficulty?: true
    maxValue?: true
    baseXp?: true
    assignedToId?: true
    lastSentById?: true
    attackSourcePlayerId?: true
    pvpAttackId?: true
    bounceCount?: true
  }

  export type TicketSumAggregateInputType = {
    id?: true
    difficulty?: true
    maxValue?: true
    baseXp?: true
    assignedToId?: true
    lastSentById?: true
    attackSourcePlayerId?: true
    pvpAttackId?: true
    bounceCount?: true
  }

  export type TicketMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    category?: true
    severity?: true
    difficulty?: true
    status?: true
    maxValue?: true
    baseXp?: true
    successMessage?: true
    failureMessage?: true
    assignedToId?: true
    lastSentById?: true
    attackSourcePlayerId?: true
    pvpAttackId?: true
    bounceCount?: true
    abandonmentPenaltyApplied?: true
    abandonmentPenaltyAt?: true
    resolvedAt?: true
    expiredAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TicketMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    category?: true
    severity?: true
    difficulty?: true
    status?: true
    maxValue?: true
    baseXp?: true
    successMessage?: true
    failureMessage?: true
    assignedToId?: true
    lastSentById?: true
    attackSourcePlayerId?: true
    pvpAttackId?: true
    bounceCount?: true
    abandonmentPenaltyApplied?: true
    abandonmentPenaltyAt?: true
    resolvedAt?: true
    expiredAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TicketCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    category?: true
    severity?: true
    difficulty?: true
    status?: true
    maxValue?: true
    baseXp?: true
    successMessage?: true
    failureMessage?: true
    assignedToId?: true
    lastSentById?: true
    attackSourcePlayerId?: true
    pvpAttackId?: true
    bounceCount?: true
    abandonmentPenaltyApplied?: true
    abandonmentPenaltyAt?: true
    resolvedAt?: true
    expiredAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TicketAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Ticket to aggregate.
     */
    where?: TicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tickets to fetch.
     */
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tickets
    **/
    _count?: true | TicketCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TicketAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TicketSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TicketMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TicketMaxAggregateInputType
  }

  export type GetTicketAggregateType<T extends TicketAggregateArgs> = {
        [P in keyof T & keyof AggregateTicket]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTicket[P]>
      : GetScalarType<T[P], AggregateTicket[P]>
  }




  export type TicketGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketWhereInput
    orderBy?: TicketOrderByWithAggregationInput | TicketOrderByWithAggregationInput[]
    by: TicketScalarFieldEnum[] | TicketScalarFieldEnum
    having?: TicketScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TicketCountAggregateInputType | true
    _avg?: TicketAvgAggregateInputType
    _sum?: TicketSumAggregateInputType
    _min?: TicketMinAggregateInputType
    _max?: TicketMaxAggregateInputType
  }

  export type TicketGroupByOutputType = {
    id: number
    title: string
    description: string
    category: $Enums.TicketCategory
    severity: $Enums.TicketSeverity
    difficulty: number
    status: $Enums.TicketStatus
    maxValue: number
    baseXp: number
    successMessage: string | null
    failureMessage: string | null
    assignedToId: number
    lastSentById: number | null
    attackSourcePlayerId: number | null
    pvpAttackId: number | null
    bounceCount: number
    abandonmentPenaltyApplied: boolean
    abandonmentPenaltyAt: Date | null
    resolvedAt: Date | null
    expiredAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: TicketCountAggregateOutputType | null
    _avg: TicketAvgAggregateOutputType | null
    _sum: TicketSumAggregateOutputType | null
    _min: TicketMinAggregateOutputType | null
    _max: TicketMaxAggregateOutputType | null
  }

  type GetTicketGroupByPayload<T extends TicketGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TicketGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TicketGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TicketGroupByOutputType[P]>
            : GetScalarType<T[P], TicketGroupByOutputType[P]>
        }
      >
    >


  export type TicketSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    severity?: boolean
    difficulty?: boolean
    status?: boolean
    maxValue?: boolean
    baseXp?: boolean
    successMessage?: boolean
    failureMessage?: boolean
    assignedToId?: boolean
    lastSentById?: boolean
    attackSourcePlayerId?: boolean
    pvpAttackId?: boolean
    bounceCount?: boolean
    abandonmentPenaltyApplied?: boolean
    abandonmentPenaltyAt?: boolean
    resolvedAt?: boolean
    expiredAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    assignedTo?: boolean | PlayerDefaultArgs<ExtArgs>
    lastSentBy?: boolean | Ticket$lastSentByArgs<ExtArgs>
    attackSourcePlayer?: boolean | Ticket$attackSourcePlayerArgs<ExtArgs>
    pvpAttack?: boolean | Ticket$pvpAttackArgs<ExtArgs>
  }, ExtArgs["result"]["ticket"]>

  export type TicketSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    severity?: boolean
    difficulty?: boolean
    status?: boolean
    maxValue?: boolean
    baseXp?: boolean
    successMessage?: boolean
    failureMessage?: boolean
    assignedToId?: boolean
    lastSentById?: boolean
    attackSourcePlayerId?: boolean
    pvpAttackId?: boolean
    bounceCount?: boolean
    abandonmentPenaltyApplied?: boolean
    abandonmentPenaltyAt?: boolean
    resolvedAt?: boolean
    expiredAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    assignedTo?: boolean | PlayerDefaultArgs<ExtArgs>
    lastSentBy?: boolean | Ticket$lastSentByArgs<ExtArgs>
    attackSourcePlayer?: boolean | Ticket$attackSourcePlayerArgs<ExtArgs>
    pvpAttack?: boolean | Ticket$pvpAttackArgs<ExtArgs>
  }, ExtArgs["result"]["ticket"]>

  export type TicketSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    severity?: boolean
    difficulty?: boolean
    status?: boolean
    maxValue?: boolean
    baseXp?: boolean
    successMessage?: boolean
    failureMessage?: boolean
    assignedToId?: boolean
    lastSentById?: boolean
    attackSourcePlayerId?: boolean
    pvpAttackId?: boolean
    bounceCount?: boolean
    abandonmentPenaltyApplied?: boolean
    abandonmentPenaltyAt?: boolean
    resolvedAt?: boolean
    expiredAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    assignedTo?: boolean | PlayerDefaultArgs<ExtArgs>
    lastSentBy?: boolean | Ticket$lastSentByArgs<ExtArgs>
    attackSourcePlayer?: boolean | Ticket$attackSourcePlayerArgs<ExtArgs>
    pvpAttack?: boolean | Ticket$pvpAttackArgs<ExtArgs>
  }, ExtArgs["result"]["ticket"]>

  export type TicketSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    severity?: boolean
    difficulty?: boolean
    status?: boolean
    maxValue?: boolean
    baseXp?: boolean
    successMessage?: boolean
    failureMessage?: boolean
    assignedToId?: boolean
    lastSentById?: boolean
    attackSourcePlayerId?: boolean
    pvpAttackId?: boolean
    bounceCount?: boolean
    abandonmentPenaltyApplied?: boolean
    abandonmentPenaltyAt?: boolean
    resolvedAt?: boolean
    expiredAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TicketOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "category" | "severity" | "difficulty" | "status" | "maxValue" | "baseXp" | "successMessage" | "failureMessage" | "assignedToId" | "lastSentById" | "attackSourcePlayerId" | "pvpAttackId" | "bounceCount" | "abandonmentPenaltyApplied" | "abandonmentPenaltyAt" | "resolvedAt" | "expiredAt" | "createdAt" | "updatedAt", ExtArgs["result"]["ticket"]>
  export type TicketInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignedTo?: boolean | PlayerDefaultArgs<ExtArgs>
    lastSentBy?: boolean | Ticket$lastSentByArgs<ExtArgs>
    attackSourcePlayer?: boolean | Ticket$attackSourcePlayerArgs<ExtArgs>
    pvpAttack?: boolean | Ticket$pvpAttackArgs<ExtArgs>
  }
  export type TicketIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignedTo?: boolean | PlayerDefaultArgs<ExtArgs>
    lastSentBy?: boolean | Ticket$lastSentByArgs<ExtArgs>
    attackSourcePlayer?: boolean | Ticket$attackSourcePlayerArgs<ExtArgs>
    pvpAttack?: boolean | Ticket$pvpAttackArgs<ExtArgs>
  }
  export type TicketIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignedTo?: boolean | PlayerDefaultArgs<ExtArgs>
    lastSentBy?: boolean | Ticket$lastSentByArgs<ExtArgs>
    attackSourcePlayer?: boolean | Ticket$attackSourcePlayerArgs<ExtArgs>
    pvpAttack?: boolean | Ticket$pvpAttackArgs<ExtArgs>
  }

  export type $TicketPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Ticket"
    objects: {
      assignedTo: Prisma.$PlayerPayload<ExtArgs>
      lastSentBy: Prisma.$PlayerPayload<ExtArgs> | null
      attackSourcePlayer: Prisma.$PlayerPayload<ExtArgs> | null
      pvpAttack: Prisma.$PvPAttackPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      description: string
      category: $Enums.TicketCategory
      severity: $Enums.TicketSeverity
      difficulty: number
      status: $Enums.TicketStatus
      maxValue: number
      baseXp: number
      successMessage: string | null
      failureMessage: string | null
      assignedToId: number
      lastSentById: number | null
      attackSourcePlayerId: number | null
      pvpAttackId: number | null
      bounceCount: number
      abandonmentPenaltyApplied: boolean
      abandonmentPenaltyAt: Date | null
      resolvedAt: Date | null
      expiredAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["ticket"]>
    composites: {}
  }

  type TicketGetPayload<S extends boolean | null | undefined | TicketDefaultArgs> = $Result.GetResult<Prisma.$TicketPayload, S>

  type TicketCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TicketFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TicketCountAggregateInputType | true
    }

  export interface TicketDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Ticket'], meta: { name: 'Ticket' } }
    /**
     * Find zero or one Ticket that matches the filter.
     * @param {TicketFindUniqueArgs} args - Arguments to find a Ticket
     * @example
     * // Get one Ticket
     * const ticket = await prisma.ticket.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TicketFindUniqueArgs>(args: SelectSubset<T, TicketFindUniqueArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Ticket that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TicketFindUniqueOrThrowArgs} args - Arguments to find a Ticket
     * @example
     * // Get one Ticket
     * const ticket = await prisma.ticket.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TicketFindUniqueOrThrowArgs>(args: SelectSubset<T, TicketFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ticket that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketFindFirstArgs} args - Arguments to find a Ticket
     * @example
     * // Get one Ticket
     * const ticket = await prisma.ticket.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TicketFindFirstArgs>(args?: SelectSubset<T, TicketFindFirstArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Ticket that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketFindFirstOrThrowArgs} args - Arguments to find a Ticket
     * @example
     * // Get one Ticket
     * const ticket = await prisma.ticket.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TicketFindFirstOrThrowArgs>(args?: SelectSubset<T, TicketFindFirstOrThrowArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tickets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tickets
     * const tickets = await prisma.ticket.findMany()
     * 
     * // Get first 10 Tickets
     * const tickets = await prisma.ticket.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ticketWithIdOnly = await prisma.ticket.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TicketFindManyArgs>(args?: SelectSubset<T, TicketFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Ticket.
     * @param {TicketCreateArgs} args - Arguments to create a Ticket.
     * @example
     * // Create one Ticket
     * const Ticket = await prisma.ticket.create({
     *   data: {
     *     // ... data to create a Ticket
     *   }
     * })
     * 
     */
    create<T extends TicketCreateArgs>(args: SelectSubset<T, TicketCreateArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tickets.
     * @param {TicketCreateManyArgs} args - Arguments to create many Tickets.
     * @example
     * // Create many Tickets
     * const ticket = await prisma.ticket.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TicketCreateManyArgs>(args?: SelectSubset<T, TicketCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tickets and returns the data saved in the database.
     * @param {TicketCreateManyAndReturnArgs} args - Arguments to create many Tickets.
     * @example
     * // Create many Tickets
     * const ticket = await prisma.ticket.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tickets and only return the `id`
     * const ticketWithIdOnly = await prisma.ticket.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TicketCreateManyAndReturnArgs>(args?: SelectSubset<T, TicketCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Ticket.
     * @param {TicketDeleteArgs} args - Arguments to delete one Ticket.
     * @example
     * // Delete one Ticket
     * const Ticket = await prisma.ticket.delete({
     *   where: {
     *     // ... filter to delete one Ticket
     *   }
     * })
     * 
     */
    delete<T extends TicketDeleteArgs>(args: SelectSubset<T, TicketDeleteArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Ticket.
     * @param {TicketUpdateArgs} args - Arguments to update one Ticket.
     * @example
     * // Update one Ticket
     * const ticket = await prisma.ticket.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TicketUpdateArgs>(args: SelectSubset<T, TicketUpdateArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tickets.
     * @param {TicketDeleteManyArgs} args - Arguments to filter Tickets to delete.
     * @example
     * // Delete a few Tickets
     * const { count } = await prisma.ticket.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TicketDeleteManyArgs>(args?: SelectSubset<T, TicketDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tickets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tickets
     * const ticket = await prisma.ticket.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TicketUpdateManyArgs>(args: SelectSubset<T, TicketUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tickets and returns the data updated in the database.
     * @param {TicketUpdateManyAndReturnArgs} args - Arguments to update many Tickets.
     * @example
     * // Update many Tickets
     * const ticket = await prisma.ticket.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tickets and only return the `id`
     * const ticketWithIdOnly = await prisma.ticket.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TicketUpdateManyAndReturnArgs>(args: SelectSubset<T, TicketUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Ticket.
     * @param {TicketUpsertArgs} args - Arguments to update or create a Ticket.
     * @example
     * // Update or create a Ticket
     * const ticket = await prisma.ticket.upsert({
     *   create: {
     *     // ... data to create a Ticket
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Ticket we want to update
     *   }
     * })
     */
    upsert<T extends TicketUpsertArgs>(args: SelectSubset<T, TicketUpsertArgs<ExtArgs>>): Prisma__TicketClient<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tickets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketCountArgs} args - Arguments to filter Tickets to count.
     * @example
     * // Count the number of Tickets
     * const count = await prisma.ticket.count({
     *   where: {
     *     // ... the filter for the Tickets we want to count
     *   }
     * })
    **/
    count<T extends TicketCountArgs>(
      args?: Subset<T, TicketCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TicketCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Ticket.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TicketAggregateArgs>(args: Subset<T, TicketAggregateArgs>): Prisma.PrismaPromise<GetTicketAggregateType<T>>

    /**
     * Group by Ticket.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TicketGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TicketGroupByArgs['orderBy'] }
        : { orderBy?: TicketGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TicketGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTicketGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Ticket model
   */
  readonly fields: TicketFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Ticket.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TicketClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    assignedTo<T extends PlayerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PlayerDefaultArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    lastSentBy<T extends Ticket$lastSentByArgs<ExtArgs> = {}>(args?: Subset<T, Ticket$lastSentByArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    attackSourcePlayer<T extends Ticket$attackSourcePlayerArgs<ExtArgs> = {}>(args?: Subset<T, Ticket$attackSourcePlayerArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    pvpAttack<T extends Ticket$pvpAttackArgs<ExtArgs> = {}>(args?: Subset<T, Ticket$pvpAttackArgs<ExtArgs>>): Prisma__PvPAttackClient<$Result.GetResult<Prisma.$PvPAttackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Ticket model
   */
  interface TicketFieldRefs {
    readonly id: FieldRef<"Ticket", 'Int'>
    readonly title: FieldRef<"Ticket", 'String'>
    readonly description: FieldRef<"Ticket", 'String'>
    readonly category: FieldRef<"Ticket", 'TicketCategory'>
    readonly severity: FieldRef<"Ticket", 'TicketSeverity'>
    readonly difficulty: FieldRef<"Ticket", 'Int'>
    readonly status: FieldRef<"Ticket", 'TicketStatus'>
    readonly maxValue: FieldRef<"Ticket", 'Int'>
    readonly baseXp: FieldRef<"Ticket", 'Int'>
    readonly successMessage: FieldRef<"Ticket", 'String'>
    readonly failureMessage: FieldRef<"Ticket", 'String'>
    readonly assignedToId: FieldRef<"Ticket", 'Int'>
    readonly lastSentById: FieldRef<"Ticket", 'Int'>
    readonly attackSourcePlayerId: FieldRef<"Ticket", 'Int'>
    readonly pvpAttackId: FieldRef<"Ticket", 'Int'>
    readonly bounceCount: FieldRef<"Ticket", 'Int'>
    readonly abandonmentPenaltyApplied: FieldRef<"Ticket", 'Boolean'>
    readonly abandonmentPenaltyAt: FieldRef<"Ticket", 'DateTime'>
    readonly resolvedAt: FieldRef<"Ticket", 'DateTime'>
    readonly expiredAt: FieldRef<"Ticket", 'DateTime'>
    readonly createdAt: FieldRef<"Ticket", 'DateTime'>
    readonly updatedAt: FieldRef<"Ticket", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Ticket findUnique
   */
  export type TicketFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter, which Ticket to fetch.
     */
    where: TicketWhereUniqueInput
  }

  /**
   * Ticket findUniqueOrThrow
   */
  export type TicketFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter, which Ticket to fetch.
     */
    where: TicketWhereUniqueInput
  }

  /**
   * Ticket findFirst
   */
  export type TicketFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter, which Ticket to fetch.
     */
    where?: TicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tickets to fetch.
     */
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tickets.
     */
    cursor?: TicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tickets.
     */
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }

  /**
   * Ticket findFirstOrThrow
   */
  export type TicketFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter, which Ticket to fetch.
     */
    where?: TicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tickets to fetch.
     */
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tickets.
     */
    cursor?: TicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tickets.
     */
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }

  /**
   * Ticket findMany
   */
  export type TicketFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter, which Tickets to fetch.
     */
    where?: TicketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tickets to fetch.
     */
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tickets.
     */
    cursor?: TicketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tickets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tickets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tickets.
     */
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }

  /**
   * Ticket create
   */
  export type TicketCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * The data needed to create a Ticket.
     */
    data: XOR<TicketCreateInput, TicketUncheckedCreateInput>
  }

  /**
   * Ticket createMany
   */
  export type TicketCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tickets.
     */
    data: TicketCreateManyInput | TicketCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Ticket createManyAndReturn
   */
  export type TicketCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * The data used to create many Tickets.
     */
    data: TicketCreateManyInput | TicketCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Ticket update
   */
  export type TicketUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * The data needed to update a Ticket.
     */
    data: XOR<TicketUpdateInput, TicketUncheckedUpdateInput>
    /**
     * Choose, which Ticket to update.
     */
    where: TicketWhereUniqueInput
  }

  /**
   * Ticket updateMany
   */
  export type TicketUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tickets.
     */
    data: XOR<TicketUpdateManyMutationInput, TicketUncheckedUpdateManyInput>
    /**
     * Filter which Tickets to update
     */
    where?: TicketWhereInput
    /**
     * Limit how many Tickets to update.
     */
    limit?: number
  }

  /**
   * Ticket updateManyAndReturn
   */
  export type TicketUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * The data used to update Tickets.
     */
    data: XOR<TicketUpdateManyMutationInput, TicketUncheckedUpdateManyInput>
    /**
     * Filter which Tickets to update
     */
    where?: TicketWhereInput
    /**
     * Limit how many Tickets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Ticket upsert
   */
  export type TicketUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * The filter to search for the Ticket to update in case it exists.
     */
    where: TicketWhereUniqueInput
    /**
     * In case the Ticket found by the `where` argument doesn't exist, create a new Ticket with this data.
     */
    create: XOR<TicketCreateInput, TicketUncheckedCreateInput>
    /**
     * In case the Ticket was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TicketUpdateInput, TicketUncheckedUpdateInput>
  }

  /**
   * Ticket delete
   */
  export type TicketDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    /**
     * Filter which Ticket to delete.
     */
    where: TicketWhereUniqueInput
  }

  /**
   * Ticket deleteMany
   */
  export type TicketDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tickets to delete
     */
    where?: TicketWhereInput
    /**
     * Limit how many Tickets to delete.
     */
    limit?: number
  }

  /**
   * Ticket.lastSentBy
   */
  export type Ticket$lastSentByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    where?: PlayerWhereInput
  }

  /**
   * Ticket.attackSourcePlayer
   */
  export type Ticket$attackSourcePlayerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    where?: PlayerWhereInput
  }

  /**
   * Ticket.pvpAttack
   */
  export type Ticket$pvpAttackArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvPAttack
     */
    select?: PvPAttackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvPAttack
     */
    omit?: PvPAttackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvPAttackInclude<ExtArgs> | null
    where?: PvPAttackWhereInput
  }

  /**
   * Ticket without action
   */
  export type TicketDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
  }


  /**
   * Model TicketTemplate
   */

  export type AggregateTicketTemplate = {
    _count: TicketTemplateCountAggregateOutputType | null
    _avg: TicketTemplateAvgAggregateOutputType | null
    _sum: TicketTemplateSumAggregateOutputType | null
    _min: TicketTemplateMinAggregateOutputType | null
    _max: TicketTemplateMaxAggregateOutputType | null
  }

  export type TicketTemplateAvgAggregateOutputType = {
    id: number | null
    difficulty: number | null
    maxValue: number | null
    baseXp: number | null
  }

  export type TicketTemplateSumAggregateOutputType = {
    id: number | null
    difficulty: number | null
    maxValue: number | null
    baseXp: number | null
  }

  export type TicketTemplateMinAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    category: $Enums.TicketCategory | null
    severity: $Enums.TicketSeverity | null
    difficulty: number | null
    maxValue: number | null
    baseXp: number | null
    successMessage: string | null
    failureMessage: string | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TicketTemplateMaxAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    category: $Enums.TicketCategory | null
    severity: $Enums.TicketSeverity | null
    difficulty: number | null
    maxValue: number | null
    baseXp: number | null
    successMessage: string | null
    failureMessage: string | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TicketTemplateCountAggregateOutputType = {
    id: number
    title: number
    description: number
    category: number
    severity: number
    difficulty: number
    maxValue: number
    baseXp: number
    successMessage: number
    failureMessage: number
    active: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TicketTemplateAvgAggregateInputType = {
    id?: true
    difficulty?: true
    maxValue?: true
    baseXp?: true
  }

  export type TicketTemplateSumAggregateInputType = {
    id?: true
    difficulty?: true
    maxValue?: true
    baseXp?: true
  }

  export type TicketTemplateMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    category?: true
    severity?: true
    difficulty?: true
    maxValue?: true
    baseXp?: true
    successMessage?: true
    failureMessage?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TicketTemplateMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    category?: true
    severity?: true
    difficulty?: true
    maxValue?: true
    baseXp?: true
    successMessage?: true
    failureMessage?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TicketTemplateCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    category?: true
    severity?: true
    difficulty?: true
    maxValue?: true
    baseXp?: true
    successMessage?: true
    failureMessage?: true
    active?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TicketTemplateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TicketTemplate to aggregate.
     */
    where?: TicketTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TicketTemplates to fetch.
     */
    orderBy?: TicketTemplateOrderByWithRelationInput | TicketTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TicketTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TicketTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TicketTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TicketTemplates
    **/
    _count?: true | TicketTemplateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TicketTemplateAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TicketTemplateSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TicketTemplateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TicketTemplateMaxAggregateInputType
  }

  export type GetTicketTemplateAggregateType<T extends TicketTemplateAggregateArgs> = {
        [P in keyof T & keyof AggregateTicketTemplate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTicketTemplate[P]>
      : GetScalarType<T[P], AggregateTicketTemplate[P]>
  }




  export type TicketTemplateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TicketTemplateWhereInput
    orderBy?: TicketTemplateOrderByWithAggregationInput | TicketTemplateOrderByWithAggregationInput[]
    by: TicketTemplateScalarFieldEnum[] | TicketTemplateScalarFieldEnum
    having?: TicketTemplateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TicketTemplateCountAggregateInputType | true
    _avg?: TicketTemplateAvgAggregateInputType
    _sum?: TicketTemplateSumAggregateInputType
    _min?: TicketTemplateMinAggregateInputType
    _max?: TicketTemplateMaxAggregateInputType
  }

  export type TicketTemplateGroupByOutputType = {
    id: number
    title: string
    description: string
    category: $Enums.TicketCategory
    severity: $Enums.TicketSeverity
    difficulty: number
    maxValue: number
    baseXp: number
    successMessage: string | null
    failureMessage: string | null
    active: boolean
    createdAt: Date
    updatedAt: Date
    _count: TicketTemplateCountAggregateOutputType | null
    _avg: TicketTemplateAvgAggregateOutputType | null
    _sum: TicketTemplateSumAggregateOutputType | null
    _min: TicketTemplateMinAggregateOutputType | null
    _max: TicketTemplateMaxAggregateOutputType | null
  }

  type GetTicketTemplateGroupByPayload<T extends TicketTemplateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TicketTemplateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TicketTemplateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TicketTemplateGroupByOutputType[P]>
            : GetScalarType<T[P], TicketTemplateGroupByOutputType[P]>
        }
      >
    >


  export type TicketTemplateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    severity?: boolean
    difficulty?: boolean
    maxValue?: boolean
    baseXp?: boolean
    successMessage?: boolean
    failureMessage?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["ticketTemplate"]>

  export type TicketTemplateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    severity?: boolean
    difficulty?: boolean
    maxValue?: boolean
    baseXp?: boolean
    successMessage?: boolean
    failureMessage?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["ticketTemplate"]>

  export type TicketTemplateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    severity?: boolean
    difficulty?: boolean
    maxValue?: boolean
    baseXp?: boolean
    successMessage?: boolean
    failureMessage?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["ticketTemplate"]>

  export type TicketTemplateSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    category?: boolean
    severity?: boolean
    difficulty?: boolean
    maxValue?: boolean
    baseXp?: boolean
    successMessage?: boolean
    failureMessage?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TicketTemplateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "category" | "severity" | "difficulty" | "maxValue" | "baseXp" | "successMessage" | "failureMessage" | "active" | "createdAt" | "updatedAt", ExtArgs["result"]["ticketTemplate"]>

  export type $TicketTemplatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TicketTemplate"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      description: string
      category: $Enums.TicketCategory
      severity: $Enums.TicketSeverity
      difficulty: number
      maxValue: number
      baseXp: number
      successMessage: string | null
      failureMessage: string | null
      active: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["ticketTemplate"]>
    composites: {}
  }

  type TicketTemplateGetPayload<S extends boolean | null | undefined | TicketTemplateDefaultArgs> = $Result.GetResult<Prisma.$TicketTemplatePayload, S>

  type TicketTemplateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TicketTemplateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TicketTemplateCountAggregateInputType | true
    }

  export interface TicketTemplateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TicketTemplate'], meta: { name: 'TicketTemplate' } }
    /**
     * Find zero or one TicketTemplate that matches the filter.
     * @param {TicketTemplateFindUniqueArgs} args - Arguments to find a TicketTemplate
     * @example
     * // Get one TicketTemplate
     * const ticketTemplate = await prisma.ticketTemplate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TicketTemplateFindUniqueArgs>(args: SelectSubset<T, TicketTemplateFindUniqueArgs<ExtArgs>>): Prisma__TicketTemplateClient<$Result.GetResult<Prisma.$TicketTemplatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TicketTemplate that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TicketTemplateFindUniqueOrThrowArgs} args - Arguments to find a TicketTemplate
     * @example
     * // Get one TicketTemplate
     * const ticketTemplate = await prisma.ticketTemplate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TicketTemplateFindUniqueOrThrowArgs>(args: SelectSubset<T, TicketTemplateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TicketTemplateClient<$Result.GetResult<Prisma.$TicketTemplatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TicketTemplate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketTemplateFindFirstArgs} args - Arguments to find a TicketTemplate
     * @example
     * // Get one TicketTemplate
     * const ticketTemplate = await prisma.ticketTemplate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TicketTemplateFindFirstArgs>(args?: SelectSubset<T, TicketTemplateFindFirstArgs<ExtArgs>>): Prisma__TicketTemplateClient<$Result.GetResult<Prisma.$TicketTemplatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TicketTemplate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketTemplateFindFirstOrThrowArgs} args - Arguments to find a TicketTemplate
     * @example
     * // Get one TicketTemplate
     * const ticketTemplate = await prisma.ticketTemplate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TicketTemplateFindFirstOrThrowArgs>(args?: SelectSubset<T, TicketTemplateFindFirstOrThrowArgs<ExtArgs>>): Prisma__TicketTemplateClient<$Result.GetResult<Prisma.$TicketTemplatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TicketTemplates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketTemplateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TicketTemplates
     * const ticketTemplates = await prisma.ticketTemplate.findMany()
     * 
     * // Get first 10 TicketTemplates
     * const ticketTemplates = await prisma.ticketTemplate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ticketTemplateWithIdOnly = await prisma.ticketTemplate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TicketTemplateFindManyArgs>(args?: SelectSubset<T, TicketTemplateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketTemplatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TicketTemplate.
     * @param {TicketTemplateCreateArgs} args - Arguments to create a TicketTemplate.
     * @example
     * // Create one TicketTemplate
     * const TicketTemplate = await prisma.ticketTemplate.create({
     *   data: {
     *     // ... data to create a TicketTemplate
     *   }
     * })
     * 
     */
    create<T extends TicketTemplateCreateArgs>(args: SelectSubset<T, TicketTemplateCreateArgs<ExtArgs>>): Prisma__TicketTemplateClient<$Result.GetResult<Prisma.$TicketTemplatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TicketTemplates.
     * @param {TicketTemplateCreateManyArgs} args - Arguments to create many TicketTemplates.
     * @example
     * // Create many TicketTemplates
     * const ticketTemplate = await prisma.ticketTemplate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TicketTemplateCreateManyArgs>(args?: SelectSubset<T, TicketTemplateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TicketTemplates and returns the data saved in the database.
     * @param {TicketTemplateCreateManyAndReturnArgs} args - Arguments to create many TicketTemplates.
     * @example
     * // Create many TicketTemplates
     * const ticketTemplate = await prisma.ticketTemplate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TicketTemplates and only return the `id`
     * const ticketTemplateWithIdOnly = await prisma.ticketTemplate.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TicketTemplateCreateManyAndReturnArgs>(args?: SelectSubset<T, TicketTemplateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketTemplatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TicketTemplate.
     * @param {TicketTemplateDeleteArgs} args - Arguments to delete one TicketTemplate.
     * @example
     * // Delete one TicketTemplate
     * const TicketTemplate = await prisma.ticketTemplate.delete({
     *   where: {
     *     // ... filter to delete one TicketTemplate
     *   }
     * })
     * 
     */
    delete<T extends TicketTemplateDeleteArgs>(args: SelectSubset<T, TicketTemplateDeleteArgs<ExtArgs>>): Prisma__TicketTemplateClient<$Result.GetResult<Prisma.$TicketTemplatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TicketTemplate.
     * @param {TicketTemplateUpdateArgs} args - Arguments to update one TicketTemplate.
     * @example
     * // Update one TicketTemplate
     * const ticketTemplate = await prisma.ticketTemplate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TicketTemplateUpdateArgs>(args: SelectSubset<T, TicketTemplateUpdateArgs<ExtArgs>>): Prisma__TicketTemplateClient<$Result.GetResult<Prisma.$TicketTemplatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TicketTemplates.
     * @param {TicketTemplateDeleteManyArgs} args - Arguments to filter TicketTemplates to delete.
     * @example
     * // Delete a few TicketTemplates
     * const { count } = await prisma.ticketTemplate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TicketTemplateDeleteManyArgs>(args?: SelectSubset<T, TicketTemplateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TicketTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketTemplateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TicketTemplates
     * const ticketTemplate = await prisma.ticketTemplate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TicketTemplateUpdateManyArgs>(args: SelectSubset<T, TicketTemplateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TicketTemplates and returns the data updated in the database.
     * @param {TicketTemplateUpdateManyAndReturnArgs} args - Arguments to update many TicketTemplates.
     * @example
     * // Update many TicketTemplates
     * const ticketTemplate = await prisma.ticketTemplate.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TicketTemplates and only return the `id`
     * const ticketTemplateWithIdOnly = await prisma.ticketTemplate.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TicketTemplateUpdateManyAndReturnArgs>(args: SelectSubset<T, TicketTemplateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketTemplatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TicketTemplate.
     * @param {TicketTemplateUpsertArgs} args - Arguments to update or create a TicketTemplate.
     * @example
     * // Update or create a TicketTemplate
     * const ticketTemplate = await prisma.ticketTemplate.upsert({
     *   create: {
     *     // ... data to create a TicketTemplate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TicketTemplate we want to update
     *   }
     * })
     */
    upsert<T extends TicketTemplateUpsertArgs>(args: SelectSubset<T, TicketTemplateUpsertArgs<ExtArgs>>): Prisma__TicketTemplateClient<$Result.GetResult<Prisma.$TicketTemplatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TicketTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketTemplateCountArgs} args - Arguments to filter TicketTemplates to count.
     * @example
     * // Count the number of TicketTemplates
     * const count = await prisma.ticketTemplate.count({
     *   where: {
     *     // ... the filter for the TicketTemplates we want to count
     *   }
     * })
    **/
    count<T extends TicketTemplateCountArgs>(
      args?: Subset<T, TicketTemplateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TicketTemplateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TicketTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketTemplateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TicketTemplateAggregateArgs>(args: Subset<T, TicketTemplateAggregateArgs>): Prisma.PrismaPromise<GetTicketTemplateAggregateType<T>>

    /**
     * Group by TicketTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TicketTemplateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TicketTemplateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TicketTemplateGroupByArgs['orderBy'] }
        : { orderBy?: TicketTemplateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TicketTemplateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTicketTemplateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TicketTemplate model
   */
  readonly fields: TicketTemplateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TicketTemplate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TicketTemplateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TicketTemplate model
   */
  interface TicketTemplateFieldRefs {
    readonly id: FieldRef<"TicketTemplate", 'Int'>
    readonly title: FieldRef<"TicketTemplate", 'String'>
    readonly description: FieldRef<"TicketTemplate", 'String'>
    readonly category: FieldRef<"TicketTemplate", 'TicketCategory'>
    readonly severity: FieldRef<"TicketTemplate", 'TicketSeverity'>
    readonly difficulty: FieldRef<"TicketTemplate", 'Int'>
    readonly maxValue: FieldRef<"TicketTemplate", 'Int'>
    readonly baseXp: FieldRef<"TicketTemplate", 'Int'>
    readonly successMessage: FieldRef<"TicketTemplate", 'String'>
    readonly failureMessage: FieldRef<"TicketTemplate", 'String'>
    readonly active: FieldRef<"TicketTemplate", 'Boolean'>
    readonly createdAt: FieldRef<"TicketTemplate", 'DateTime'>
    readonly updatedAt: FieldRef<"TicketTemplate", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TicketTemplate findUnique
   */
  export type TicketTemplateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketTemplate
     */
    select?: TicketTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketTemplate
     */
    omit?: TicketTemplateOmit<ExtArgs> | null
    /**
     * Filter, which TicketTemplate to fetch.
     */
    where: TicketTemplateWhereUniqueInput
  }

  /**
   * TicketTemplate findUniqueOrThrow
   */
  export type TicketTemplateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketTemplate
     */
    select?: TicketTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketTemplate
     */
    omit?: TicketTemplateOmit<ExtArgs> | null
    /**
     * Filter, which TicketTemplate to fetch.
     */
    where: TicketTemplateWhereUniqueInput
  }

  /**
   * TicketTemplate findFirst
   */
  export type TicketTemplateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketTemplate
     */
    select?: TicketTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketTemplate
     */
    omit?: TicketTemplateOmit<ExtArgs> | null
    /**
     * Filter, which TicketTemplate to fetch.
     */
    where?: TicketTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TicketTemplates to fetch.
     */
    orderBy?: TicketTemplateOrderByWithRelationInput | TicketTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TicketTemplates.
     */
    cursor?: TicketTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TicketTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TicketTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TicketTemplates.
     */
    distinct?: TicketTemplateScalarFieldEnum | TicketTemplateScalarFieldEnum[]
  }

  /**
   * TicketTemplate findFirstOrThrow
   */
  export type TicketTemplateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketTemplate
     */
    select?: TicketTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketTemplate
     */
    omit?: TicketTemplateOmit<ExtArgs> | null
    /**
     * Filter, which TicketTemplate to fetch.
     */
    where?: TicketTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TicketTemplates to fetch.
     */
    orderBy?: TicketTemplateOrderByWithRelationInput | TicketTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TicketTemplates.
     */
    cursor?: TicketTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TicketTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TicketTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TicketTemplates.
     */
    distinct?: TicketTemplateScalarFieldEnum | TicketTemplateScalarFieldEnum[]
  }

  /**
   * TicketTemplate findMany
   */
  export type TicketTemplateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketTemplate
     */
    select?: TicketTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketTemplate
     */
    omit?: TicketTemplateOmit<ExtArgs> | null
    /**
     * Filter, which TicketTemplates to fetch.
     */
    where?: TicketTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TicketTemplates to fetch.
     */
    orderBy?: TicketTemplateOrderByWithRelationInput | TicketTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TicketTemplates.
     */
    cursor?: TicketTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TicketTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TicketTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TicketTemplates.
     */
    distinct?: TicketTemplateScalarFieldEnum | TicketTemplateScalarFieldEnum[]
  }

  /**
   * TicketTemplate create
   */
  export type TicketTemplateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketTemplate
     */
    select?: TicketTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketTemplate
     */
    omit?: TicketTemplateOmit<ExtArgs> | null
    /**
     * The data needed to create a TicketTemplate.
     */
    data: XOR<TicketTemplateCreateInput, TicketTemplateUncheckedCreateInput>
  }

  /**
   * TicketTemplate createMany
   */
  export type TicketTemplateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TicketTemplates.
     */
    data: TicketTemplateCreateManyInput | TicketTemplateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TicketTemplate createManyAndReturn
   */
  export type TicketTemplateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketTemplate
     */
    select?: TicketTemplateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TicketTemplate
     */
    omit?: TicketTemplateOmit<ExtArgs> | null
    /**
     * The data used to create many TicketTemplates.
     */
    data: TicketTemplateCreateManyInput | TicketTemplateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TicketTemplate update
   */
  export type TicketTemplateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketTemplate
     */
    select?: TicketTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketTemplate
     */
    omit?: TicketTemplateOmit<ExtArgs> | null
    /**
     * The data needed to update a TicketTemplate.
     */
    data: XOR<TicketTemplateUpdateInput, TicketTemplateUncheckedUpdateInput>
    /**
     * Choose, which TicketTemplate to update.
     */
    where: TicketTemplateWhereUniqueInput
  }

  /**
   * TicketTemplate updateMany
   */
  export type TicketTemplateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TicketTemplates.
     */
    data: XOR<TicketTemplateUpdateManyMutationInput, TicketTemplateUncheckedUpdateManyInput>
    /**
     * Filter which TicketTemplates to update
     */
    where?: TicketTemplateWhereInput
    /**
     * Limit how many TicketTemplates to update.
     */
    limit?: number
  }

  /**
   * TicketTemplate updateManyAndReturn
   */
  export type TicketTemplateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketTemplate
     */
    select?: TicketTemplateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TicketTemplate
     */
    omit?: TicketTemplateOmit<ExtArgs> | null
    /**
     * The data used to update TicketTemplates.
     */
    data: XOR<TicketTemplateUpdateManyMutationInput, TicketTemplateUncheckedUpdateManyInput>
    /**
     * Filter which TicketTemplates to update
     */
    where?: TicketTemplateWhereInput
    /**
     * Limit how many TicketTemplates to update.
     */
    limit?: number
  }

  /**
   * TicketTemplate upsert
   */
  export type TicketTemplateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketTemplate
     */
    select?: TicketTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketTemplate
     */
    omit?: TicketTemplateOmit<ExtArgs> | null
    /**
     * The filter to search for the TicketTemplate to update in case it exists.
     */
    where: TicketTemplateWhereUniqueInput
    /**
     * In case the TicketTemplate found by the `where` argument doesn't exist, create a new TicketTemplate with this data.
     */
    create: XOR<TicketTemplateCreateInput, TicketTemplateUncheckedCreateInput>
    /**
     * In case the TicketTemplate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TicketTemplateUpdateInput, TicketTemplateUncheckedUpdateInput>
  }

  /**
   * TicketTemplate delete
   */
  export type TicketTemplateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketTemplate
     */
    select?: TicketTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketTemplate
     */
    omit?: TicketTemplateOmit<ExtArgs> | null
    /**
     * Filter which TicketTemplate to delete.
     */
    where: TicketTemplateWhereUniqueInput
  }

  /**
   * TicketTemplate deleteMany
   */
  export type TicketTemplateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TicketTemplates to delete
     */
    where?: TicketTemplateWhereInput
    /**
     * Limit how many TicketTemplates to delete.
     */
    limit?: number
  }

  /**
   * TicketTemplate without action
   */
  export type TicketTemplateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TicketTemplate
     */
    select?: TicketTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TicketTemplate
     */
    omit?: TicketTemplateOmit<ExtArgs> | null
  }


  /**
   * Model PvPAttack
   */

  export type AggregatePvPAttack = {
    _count: PvPAttackCountAggregateOutputType | null
    _avg: PvPAttackAvgAggregateOutputType | null
    _sum: PvPAttackSumAggregateOutputType | null
    _min: PvPAttackMinAggregateOutputType | null
    _max: PvPAttackMaxAggregateOutputType | null
  }

  export type PvPAttackAvgAggregateOutputType = {
    id: number | null
    cost: number | null
    attackerId: number | null
    targetId: number | null
  }

  export type PvPAttackSumAggregateOutputType = {
    id: number | null
    cost: number | null
    attackerId: number | null
    targetId: number | null
  }

  export type PvPAttackMinAggregateOutputType = {
    id: number | null
    type: $Enums.PvPAttackType | null
    status: $Enums.PvPAttackStatus | null
    cost: number | null
    attackerId: number | null
    targetId: number | null
    causedBankruptcy: boolean | null
    completedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PvPAttackMaxAggregateOutputType = {
    id: number | null
    type: $Enums.PvPAttackType | null
    status: $Enums.PvPAttackStatus | null
    cost: number | null
    attackerId: number | null
    targetId: number | null
    causedBankruptcy: boolean | null
    completedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PvPAttackCountAggregateOutputType = {
    id: number
    type: number
    status: number
    cost: number
    attackerId: number
    targetId: number
    causedBankruptcy: number
    completedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PvPAttackAvgAggregateInputType = {
    id?: true
    cost?: true
    attackerId?: true
    targetId?: true
  }

  export type PvPAttackSumAggregateInputType = {
    id?: true
    cost?: true
    attackerId?: true
    targetId?: true
  }

  export type PvPAttackMinAggregateInputType = {
    id?: true
    type?: true
    status?: true
    cost?: true
    attackerId?: true
    targetId?: true
    causedBankruptcy?: true
    completedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PvPAttackMaxAggregateInputType = {
    id?: true
    type?: true
    status?: true
    cost?: true
    attackerId?: true
    targetId?: true
    causedBankruptcy?: true
    completedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PvPAttackCountAggregateInputType = {
    id?: true
    type?: true
    status?: true
    cost?: true
    attackerId?: true
    targetId?: true
    causedBankruptcy?: true
    completedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PvPAttackAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PvPAttack to aggregate.
     */
    where?: PvPAttackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PvPAttacks to fetch.
     */
    orderBy?: PvPAttackOrderByWithRelationInput | PvPAttackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PvPAttackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PvPAttacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PvPAttacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PvPAttacks
    **/
    _count?: true | PvPAttackCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PvPAttackAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PvPAttackSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PvPAttackMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PvPAttackMaxAggregateInputType
  }

  export type GetPvPAttackAggregateType<T extends PvPAttackAggregateArgs> = {
        [P in keyof T & keyof AggregatePvPAttack]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePvPAttack[P]>
      : GetScalarType<T[P], AggregatePvPAttack[P]>
  }




  export type PvPAttackGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PvPAttackWhereInput
    orderBy?: PvPAttackOrderByWithAggregationInput | PvPAttackOrderByWithAggregationInput[]
    by: PvPAttackScalarFieldEnum[] | PvPAttackScalarFieldEnum
    having?: PvPAttackScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PvPAttackCountAggregateInputType | true
    _avg?: PvPAttackAvgAggregateInputType
    _sum?: PvPAttackSumAggregateInputType
    _min?: PvPAttackMinAggregateInputType
    _max?: PvPAttackMaxAggregateInputType
  }

  export type PvPAttackGroupByOutputType = {
    id: number
    type: $Enums.PvPAttackType
    status: $Enums.PvPAttackStatus
    cost: number
    attackerId: number
    targetId: number
    causedBankruptcy: boolean
    completedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: PvPAttackCountAggregateOutputType | null
    _avg: PvPAttackAvgAggregateOutputType | null
    _sum: PvPAttackSumAggregateOutputType | null
    _min: PvPAttackMinAggregateOutputType | null
    _max: PvPAttackMaxAggregateOutputType | null
  }

  type GetPvPAttackGroupByPayload<T extends PvPAttackGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PvPAttackGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PvPAttackGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PvPAttackGroupByOutputType[P]>
            : GetScalarType<T[P], PvPAttackGroupByOutputType[P]>
        }
      >
    >


  export type PvPAttackSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    status?: boolean
    cost?: boolean
    attackerId?: boolean
    targetId?: boolean
    causedBankruptcy?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    attacker?: boolean | PlayerDefaultArgs<ExtArgs>
    target?: boolean | PlayerDefaultArgs<ExtArgs>
    tickets?: boolean | PvPAttack$ticketsArgs<ExtArgs>
    _count?: boolean | PvPAttackCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pvPAttack"]>

  export type PvPAttackSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    status?: boolean
    cost?: boolean
    attackerId?: boolean
    targetId?: boolean
    causedBankruptcy?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    attacker?: boolean | PlayerDefaultArgs<ExtArgs>
    target?: boolean | PlayerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pvPAttack"]>

  export type PvPAttackSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    status?: boolean
    cost?: boolean
    attackerId?: boolean
    targetId?: boolean
    causedBankruptcy?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    attacker?: boolean | PlayerDefaultArgs<ExtArgs>
    target?: boolean | PlayerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pvPAttack"]>

  export type PvPAttackSelectScalar = {
    id?: boolean
    type?: boolean
    status?: boolean
    cost?: boolean
    attackerId?: boolean
    targetId?: boolean
    causedBankruptcy?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PvPAttackOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "status" | "cost" | "attackerId" | "targetId" | "causedBankruptcy" | "completedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["pvPAttack"]>
  export type PvPAttackInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attacker?: boolean | PlayerDefaultArgs<ExtArgs>
    target?: boolean | PlayerDefaultArgs<ExtArgs>
    tickets?: boolean | PvPAttack$ticketsArgs<ExtArgs>
    _count?: boolean | PvPAttackCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PvPAttackIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attacker?: boolean | PlayerDefaultArgs<ExtArgs>
    target?: boolean | PlayerDefaultArgs<ExtArgs>
  }
  export type PvPAttackIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    attacker?: boolean | PlayerDefaultArgs<ExtArgs>
    target?: boolean | PlayerDefaultArgs<ExtArgs>
  }

  export type $PvPAttackPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PvPAttack"
    objects: {
      attacker: Prisma.$PlayerPayload<ExtArgs>
      target: Prisma.$PlayerPayload<ExtArgs>
      tickets: Prisma.$TicketPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      type: $Enums.PvPAttackType
      status: $Enums.PvPAttackStatus
      cost: number
      attackerId: number
      targetId: number
      causedBankruptcy: boolean
      completedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["pvPAttack"]>
    composites: {}
  }

  type PvPAttackGetPayload<S extends boolean | null | undefined | PvPAttackDefaultArgs> = $Result.GetResult<Prisma.$PvPAttackPayload, S>

  type PvPAttackCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PvPAttackFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PvPAttackCountAggregateInputType | true
    }

  export interface PvPAttackDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PvPAttack'], meta: { name: 'PvPAttack' } }
    /**
     * Find zero or one PvPAttack that matches the filter.
     * @param {PvPAttackFindUniqueArgs} args - Arguments to find a PvPAttack
     * @example
     * // Get one PvPAttack
     * const pvPAttack = await prisma.pvPAttack.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PvPAttackFindUniqueArgs>(args: SelectSubset<T, PvPAttackFindUniqueArgs<ExtArgs>>): Prisma__PvPAttackClient<$Result.GetResult<Prisma.$PvPAttackPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PvPAttack that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PvPAttackFindUniqueOrThrowArgs} args - Arguments to find a PvPAttack
     * @example
     * // Get one PvPAttack
     * const pvPAttack = await prisma.pvPAttack.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PvPAttackFindUniqueOrThrowArgs>(args: SelectSubset<T, PvPAttackFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PvPAttackClient<$Result.GetResult<Prisma.$PvPAttackPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PvPAttack that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PvPAttackFindFirstArgs} args - Arguments to find a PvPAttack
     * @example
     * // Get one PvPAttack
     * const pvPAttack = await prisma.pvPAttack.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PvPAttackFindFirstArgs>(args?: SelectSubset<T, PvPAttackFindFirstArgs<ExtArgs>>): Prisma__PvPAttackClient<$Result.GetResult<Prisma.$PvPAttackPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PvPAttack that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PvPAttackFindFirstOrThrowArgs} args - Arguments to find a PvPAttack
     * @example
     * // Get one PvPAttack
     * const pvPAttack = await prisma.pvPAttack.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PvPAttackFindFirstOrThrowArgs>(args?: SelectSubset<T, PvPAttackFindFirstOrThrowArgs<ExtArgs>>): Prisma__PvPAttackClient<$Result.GetResult<Prisma.$PvPAttackPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PvPAttacks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PvPAttackFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PvPAttacks
     * const pvPAttacks = await prisma.pvPAttack.findMany()
     * 
     * // Get first 10 PvPAttacks
     * const pvPAttacks = await prisma.pvPAttack.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pvPAttackWithIdOnly = await prisma.pvPAttack.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PvPAttackFindManyArgs>(args?: SelectSubset<T, PvPAttackFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PvPAttackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PvPAttack.
     * @param {PvPAttackCreateArgs} args - Arguments to create a PvPAttack.
     * @example
     * // Create one PvPAttack
     * const PvPAttack = await prisma.pvPAttack.create({
     *   data: {
     *     // ... data to create a PvPAttack
     *   }
     * })
     * 
     */
    create<T extends PvPAttackCreateArgs>(args: SelectSubset<T, PvPAttackCreateArgs<ExtArgs>>): Prisma__PvPAttackClient<$Result.GetResult<Prisma.$PvPAttackPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PvPAttacks.
     * @param {PvPAttackCreateManyArgs} args - Arguments to create many PvPAttacks.
     * @example
     * // Create many PvPAttacks
     * const pvPAttack = await prisma.pvPAttack.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PvPAttackCreateManyArgs>(args?: SelectSubset<T, PvPAttackCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PvPAttacks and returns the data saved in the database.
     * @param {PvPAttackCreateManyAndReturnArgs} args - Arguments to create many PvPAttacks.
     * @example
     * // Create many PvPAttacks
     * const pvPAttack = await prisma.pvPAttack.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PvPAttacks and only return the `id`
     * const pvPAttackWithIdOnly = await prisma.pvPAttack.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PvPAttackCreateManyAndReturnArgs>(args?: SelectSubset<T, PvPAttackCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PvPAttackPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PvPAttack.
     * @param {PvPAttackDeleteArgs} args - Arguments to delete one PvPAttack.
     * @example
     * // Delete one PvPAttack
     * const PvPAttack = await prisma.pvPAttack.delete({
     *   where: {
     *     // ... filter to delete one PvPAttack
     *   }
     * })
     * 
     */
    delete<T extends PvPAttackDeleteArgs>(args: SelectSubset<T, PvPAttackDeleteArgs<ExtArgs>>): Prisma__PvPAttackClient<$Result.GetResult<Prisma.$PvPAttackPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PvPAttack.
     * @param {PvPAttackUpdateArgs} args - Arguments to update one PvPAttack.
     * @example
     * // Update one PvPAttack
     * const pvPAttack = await prisma.pvPAttack.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PvPAttackUpdateArgs>(args: SelectSubset<T, PvPAttackUpdateArgs<ExtArgs>>): Prisma__PvPAttackClient<$Result.GetResult<Prisma.$PvPAttackPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PvPAttacks.
     * @param {PvPAttackDeleteManyArgs} args - Arguments to filter PvPAttacks to delete.
     * @example
     * // Delete a few PvPAttacks
     * const { count } = await prisma.pvPAttack.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PvPAttackDeleteManyArgs>(args?: SelectSubset<T, PvPAttackDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PvPAttacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PvPAttackUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PvPAttacks
     * const pvPAttack = await prisma.pvPAttack.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PvPAttackUpdateManyArgs>(args: SelectSubset<T, PvPAttackUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PvPAttacks and returns the data updated in the database.
     * @param {PvPAttackUpdateManyAndReturnArgs} args - Arguments to update many PvPAttacks.
     * @example
     * // Update many PvPAttacks
     * const pvPAttack = await prisma.pvPAttack.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PvPAttacks and only return the `id`
     * const pvPAttackWithIdOnly = await prisma.pvPAttack.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PvPAttackUpdateManyAndReturnArgs>(args: SelectSubset<T, PvPAttackUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PvPAttackPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PvPAttack.
     * @param {PvPAttackUpsertArgs} args - Arguments to update or create a PvPAttack.
     * @example
     * // Update or create a PvPAttack
     * const pvPAttack = await prisma.pvPAttack.upsert({
     *   create: {
     *     // ... data to create a PvPAttack
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PvPAttack we want to update
     *   }
     * })
     */
    upsert<T extends PvPAttackUpsertArgs>(args: SelectSubset<T, PvPAttackUpsertArgs<ExtArgs>>): Prisma__PvPAttackClient<$Result.GetResult<Prisma.$PvPAttackPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PvPAttacks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PvPAttackCountArgs} args - Arguments to filter PvPAttacks to count.
     * @example
     * // Count the number of PvPAttacks
     * const count = await prisma.pvPAttack.count({
     *   where: {
     *     // ... the filter for the PvPAttacks we want to count
     *   }
     * })
    **/
    count<T extends PvPAttackCountArgs>(
      args?: Subset<T, PvPAttackCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PvPAttackCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PvPAttack.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PvPAttackAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PvPAttackAggregateArgs>(args: Subset<T, PvPAttackAggregateArgs>): Prisma.PrismaPromise<GetPvPAttackAggregateType<T>>

    /**
     * Group by PvPAttack.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PvPAttackGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PvPAttackGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PvPAttackGroupByArgs['orderBy'] }
        : { orderBy?: PvPAttackGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PvPAttackGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPvPAttackGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PvPAttack model
   */
  readonly fields: PvPAttackFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PvPAttack.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PvPAttackClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    attacker<T extends PlayerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PlayerDefaultArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    target<T extends PlayerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PlayerDefaultArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tickets<T extends PvPAttack$ticketsArgs<ExtArgs> = {}>(args?: Subset<T, PvPAttack$ticketsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TicketPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PvPAttack model
   */
  interface PvPAttackFieldRefs {
    readonly id: FieldRef<"PvPAttack", 'Int'>
    readonly type: FieldRef<"PvPAttack", 'PvPAttackType'>
    readonly status: FieldRef<"PvPAttack", 'PvPAttackStatus'>
    readonly cost: FieldRef<"PvPAttack", 'Int'>
    readonly attackerId: FieldRef<"PvPAttack", 'Int'>
    readonly targetId: FieldRef<"PvPAttack", 'Int'>
    readonly causedBankruptcy: FieldRef<"PvPAttack", 'Boolean'>
    readonly completedAt: FieldRef<"PvPAttack", 'DateTime'>
    readonly createdAt: FieldRef<"PvPAttack", 'DateTime'>
    readonly updatedAt: FieldRef<"PvPAttack", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PvPAttack findUnique
   */
  export type PvPAttackFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvPAttack
     */
    select?: PvPAttackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvPAttack
     */
    omit?: PvPAttackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvPAttackInclude<ExtArgs> | null
    /**
     * Filter, which PvPAttack to fetch.
     */
    where: PvPAttackWhereUniqueInput
  }

  /**
   * PvPAttack findUniqueOrThrow
   */
  export type PvPAttackFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvPAttack
     */
    select?: PvPAttackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvPAttack
     */
    omit?: PvPAttackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvPAttackInclude<ExtArgs> | null
    /**
     * Filter, which PvPAttack to fetch.
     */
    where: PvPAttackWhereUniqueInput
  }

  /**
   * PvPAttack findFirst
   */
  export type PvPAttackFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvPAttack
     */
    select?: PvPAttackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvPAttack
     */
    omit?: PvPAttackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvPAttackInclude<ExtArgs> | null
    /**
     * Filter, which PvPAttack to fetch.
     */
    where?: PvPAttackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PvPAttacks to fetch.
     */
    orderBy?: PvPAttackOrderByWithRelationInput | PvPAttackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PvPAttacks.
     */
    cursor?: PvPAttackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PvPAttacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PvPAttacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PvPAttacks.
     */
    distinct?: PvPAttackScalarFieldEnum | PvPAttackScalarFieldEnum[]
  }

  /**
   * PvPAttack findFirstOrThrow
   */
  export type PvPAttackFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvPAttack
     */
    select?: PvPAttackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvPAttack
     */
    omit?: PvPAttackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvPAttackInclude<ExtArgs> | null
    /**
     * Filter, which PvPAttack to fetch.
     */
    where?: PvPAttackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PvPAttacks to fetch.
     */
    orderBy?: PvPAttackOrderByWithRelationInput | PvPAttackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PvPAttacks.
     */
    cursor?: PvPAttackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PvPAttacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PvPAttacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PvPAttacks.
     */
    distinct?: PvPAttackScalarFieldEnum | PvPAttackScalarFieldEnum[]
  }

  /**
   * PvPAttack findMany
   */
  export type PvPAttackFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvPAttack
     */
    select?: PvPAttackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvPAttack
     */
    omit?: PvPAttackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvPAttackInclude<ExtArgs> | null
    /**
     * Filter, which PvPAttacks to fetch.
     */
    where?: PvPAttackWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PvPAttacks to fetch.
     */
    orderBy?: PvPAttackOrderByWithRelationInput | PvPAttackOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PvPAttacks.
     */
    cursor?: PvPAttackWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PvPAttacks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PvPAttacks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PvPAttacks.
     */
    distinct?: PvPAttackScalarFieldEnum | PvPAttackScalarFieldEnum[]
  }

  /**
   * PvPAttack create
   */
  export type PvPAttackCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvPAttack
     */
    select?: PvPAttackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvPAttack
     */
    omit?: PvPAttackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvPAttackInclude<ExtArgs> | null
    /**
     * The data needed to create a PvPAttack.
     */
    data: XOR<PvPAttackCreateInput, PvPAttackUncheckedCreateInput>
  }

  /**
   * PvPAttack createMany
   */
  export type PvPAttackCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PvPAttacks.
     */
    data: PvPAttackCreateManyInput | PvPAttackCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PvPAttack createManyAndReturn
   */
  export type PvPAttackCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvPAttack
     */
    select?: PvPAttackSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PvPAttack
     */
    omit?: PvPAttackOmit<ExtArgs> | null
    /**
     * The data used to create many PvPAttacks.
     */
    data: PvPAttackCreateManyInput | PvPAttackCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvPAttackIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PvPAttack update
   */
  export type PvPAttackUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvPAttack
     */
    select?: PvPAttackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvPAttack
     */
    omit?: PvPAttackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvPAttackInclude<ExtArgs> | null
    /**
     * The data needed to update a PvPAttack.
     */
    data: XOR<PvPAttackUpdateInput, PvPAttackUncheckedUpdateInput>
    /**
     * Choose, which PvPAttack to update.
     */
    where: PvPAttackWhereUniqueInput
  }

  /**
   * PvPAttack updateMany
   */
  export type PvPAttackUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PvPAttacks.
     */
    data: XOR<PvPAttackUpdateManyMutationInput, PvPAttackUncheckedUpdateManyInput>
    /**
     * Filter which PvPAttacks to update
     */
    where?: PvPAttackWhereInput
    /**
     * Limit how many PvPAttacks to update.
     */
    limit?: number
  }

  /**
   * PvPAttack updateManyAndReturn
   */
  export type PvPAttackUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvPAttack
     */
    select?: PvPAttackSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PvPAttack
     */
    omit?: PvPAttackOmit<ExtArgs> | null
    /**
     * The data used to update PvPAttacks.
     */
    data: XOR<PvPAttackUpdateManyMutationInput, PvPAttackUncheckedUpdateManyInput>
    /**
     * Filter which PvPAttacks to update
     */
    where?: PvPAttackWhereInput
    /**
     * Limit how many PvPAttacks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvPAttackIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PvPAttack upsert
   */
  export type PvPAttackUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvPAttack
     */
    select?: PvPAttackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvPAttack
     */
    omit?: PvPAttackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvPAttackInclude<ExtArgs> | null
    /**
     * The filter to search for the PvPAttack to update in case it exists.
     */
    where: PvPAttackWhereUniqueInput
    /**
     * In case the PvPAttack found by the `where` argument doesn't exist, create a new PvPAttack with this data.
     */
    create: XOR<PvPAttackCreateInput, PvPAttackUncheckedCreateInput>
    /**
     * In case the PvPAttack was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PvPAttackUpdateInput, PvPAttackUncheckedUpdateInput>
  }

  /**
   * PvPAttack delete
   */
  export type PvPAttackDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvPAttack
     */
    select?: PvPAttackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvPAttack
     */
    omit?: PvPAttackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvPAttackInclude<ExtArgs> | null
    /**
     * Filter which PvPAttack to delete.
     */
    where: PvPAttackWhereUniqueInput
  }

  /**
   * PvPAttack deleteMany
   */
  export type PvPAttackDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PvPAttacks to delete
     */
    where?: PvPAttackWhereInput
    /**
     * Limit how many PvPAttacks to delete.
     */
    limit?: number
  }

  /**
   * PvPAttack.tickets
   */
  export type PvPAttack$ticketsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Ticket
     */
    select?: TicketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Ticket
     */
    omit?: TicketOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TicketInclude<ExtArgs> | null
    where?: TicketWhereInput
    orderBy?: TicketOrderByWithRelationInput | TicketOrderByWithRelationInput[]
    cursor?: TicketWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TicketScalarFieldEnum | TicketScalarFieldEnum[]
  }

  /**
   * PvPAttack without action
   */
  export type PvPAttackDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PvPAttack
     */
    select?: PvPAttackSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PvPAttack
     */
    omit?: PvPAttackOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PvPAttackInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: boolean | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: boolean | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    emailVerified: number
    image: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    player?: boolean | User$playerArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "emailVerified" | "image" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    player?: boolean | User$playerArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      accounts: Prisma.$AccountPayload<ExtArgs>[]
      player: Prisma.$PlayerPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      emailVerified: boolean
      image: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    player<T extends User$playerArgs<ExtArgs> = {}>(args?: Subset<T, User$playerArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'Boolean'>
    readonly image: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User.player
   */
  export type User$playerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    where?: PlayerWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    expiresAt: Date | null
    token: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    userId: string | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    expiresAt: Date | null
    token: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    userId: string | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    expiresAt: number
    token: number
    createdAt: number
    updatedAt: number
    ipAddress: number
    userAgent: number
    userId: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    expiresAt: Date
    token: string
    createdAt: Date
    updatedAt: Date
    ipAddress: string | null
    userAgent: string | null
    userId: string
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "expiresAt" | "token" | "createdAt" | "updatedAt" | "ipAddress" | "userAgent" | "userId", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      expiresAt: Date
      token: string
      createdAt: Date
      updatedAt: Date
      ipAddress: string | null
      userAgent: string | null
      userId: string
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly expiresAt: FieldRef<"Session", 'DateTime'>
    readonly token: FieldRef<"Session", 'String'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
    readonly updatedAt: FieldRef<"Session", 'DateTime'>
    readonly ipAddress: FieldRef<"Session", 'String'>
    readonly userAgent: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    accountId: string | null
    providerId: string | null
    userId: string | null
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    accountId: string | null
    providerId: string | null
    userId: string | null
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    accountId: number
    providerId: number
    userId: number
    accessToken: number
    refreshToken: number
    idToken: number
    accessTokenExpiresAt: number
    refreshTokenExpiresAt: number
    scope: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AccountMinAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date
    updatedAt: Date
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "accountId" | "providerId" | "userId" | "accessToken" | "refreshToken" | "idToken" | "accessTokenExpiresAt" | "refreshTokenExpiresAt" | "scope" | "password" | "createdAt" | "updatedAt", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      accountId: string
      providerId: string
      userId: string
      accessToken: string | null
      refreshToken: string | null
      idToken: string | null
      accessTokenExpiresAt: Date | null
      refreshTokenExpiresAt: Date | null
      scope: string | null
      password: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly accountId: FieldRef<"Account", 'String'>
    readonly providerId: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly accessToken: FieldRef<"Account", 'String'>
    readonly refreshToken: FieldRef<"Account", 'String'>
    readonly idToken: FieldRef<"Account", 'String'>
    readonly accessTokenExpiresAt: FieldRef<"Account", 'DateTime'>
    readonly refreshTokenExpiresAt: FieldRef<"Account", 'DateTime'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly password: FieldRef<"Account", 'String'>
    readonly createdAt: FieldRef<"Account", 'DateTime'>
    readonly updatedAt: FieldRef<"Account", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Verification
   */

  export type AggregateVerification = {
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  export type VerificationMinAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationMaxAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationCountAggregateOutputType = {
    id: number
    identifier: number
    value: number
    expiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VerificationMinAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationMaxAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationCountAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VerificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Verification to aggregate.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Verifications
    **/
    _count?: true | VerificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationMaxAggregateInputType
  }

  export type GetVerificationAggregateType<T extends VerificationAggregateArgs> = {
        [P in keyof T & keyof AggregateVerification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerification[P]>
      : GetScalarType<T[P], AggregateVerification[P]>
  }




  export type VerificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationWhereInput
    orderBy?: VerificationOrderByWithAggregationInput | VerificationOrderByWithAggregationInput[]
    by: VerificationScalarFieldEnum[] | VerificationScalarFieldEnum
    having?: VerificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationCountAggregateInputType | true
    _min?: VerificationMinAggregateInputType
    _max?: VerificationMaxAggregateInputType
  }

  export type VerificationGroupByOutputType = {
    id: string
    identifier: string
    value: string
    expiresAt: Date
    createdAt: Date
    updatedAt: Date
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  type GetVerificationGroupByPayload<T extends VerificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationGroupByOutputType[P]>
        }
      >
    >


  export type VerificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectScalar = {
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VerificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "identifier" | "value" | "expiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["verification"]>

  export type $VerificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Verification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      identifier: string
      value: string
      expiresAt: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["verification"]>
    composites: {}
  }

  type VerificationGetPayload<S extends boolean | null | undefined | VerificationDefaultArgs> = $Result.GetResult<Prisma.$VerificationPayload, S>

  type VerificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationCountAggregateInputType | true
    }

  export interface VerificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Verification'], meta: { name: 'Verification' } }
    /**
     * Find zero or one Verification that matches the filter.
     * @param {VerificationFindUniqueArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationFindUniqueArgs>(args: SelectSubset<T, VerificationFindUniqueArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Verification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationFindUniqueOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationFindFirstArgs>(args?: SelectSubset<T, VerificationFindFirstArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Verifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Verifications
     * const verifications = await prisma.verification.findMany()
     * 
     * // Get first 10 Verifications
     * const verifications = await prisma.verification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const verificationWithIdOnly = await prisma.verification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VerificationFindManyArgs>(args?: SelectSubset<T, VerificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Verification.
     * @param {VerificationCreateArgs} args - Arguments to create a Verification.
     * @example
     * // Create one Verification
     * const Verification = await prisma.verification.create({
     *   data: {
     *     // ... data to create a Verification
     *   }
     * })
     * 
     */
    create<T extends VerificationCreateArgs>(args: SelectSubset<T, VerificationCreateArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Verifications.
     * @param {VerificationCreateManyArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationCreateManyArgs>(args?: SelectSubset<T, VerificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Verifications and returns the data saved in the database.
     * @param {VerificationCreateManyAndReturnArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Verifications and only return the `id`
     * const verificationWithIdOnly = await prisma.verification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Verification.
     * @param {VerificationDeleteArgs} args - Arguments to delete one Verification.
     * @example
     * // Delete one Verification
     * const Verification = await prisma.verification.delete({
     *   where: {
     *     // ... filter to delete one Verification
     *   }
     * })
     * 
     */
    delete<T extends VerificationDeleteArgs>(args: SelectSubset<T, VerificationDeleteArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Verification.
     * @param {VerificationUpdateArgs} args - Arguments to update one Verification.
     * @example
     * // Update one Verification
     * const verification = await prisma.verification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationUpdateArgs>(args: SelectSubset<T, VerificationUpdateArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Verifications.
     * @param {VerificationDeleteManyArgs} args - Arguments to filter Verifications to delete.
     * @example
     * // Delete a few Verifications
     * const { count } = await prisma.verification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationDeleteManyArgs>(args?: SelectSubset<T, VerificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationUpdateManyArgs>(args: SelectSubset<T, VerificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verifications and returns the data updated in the database.
     * @param {VerificationUpdateManyAndReturnArgs} args - Arguments to update many Verifications.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Verifications and only return the `id`
     * const verificationWithIdOnly = await prisma.verification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VerificationUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Verification.
     * @param {VerificationUpsertArgs} args - Arguments to update or create a Verification.
     * @example
     * // Update or create a Verification
     * const verification = await prisma.verification.upsert({
     *   create: {
     *     // ... data to create a Verification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Verification we want to update
     *   }
     * })
     */
    upsert<T extends VerificationUpsertArgs>(args: SelectSubset<T, VerificationUpsertArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationCountArgs} args - Arguments to filter Verifications to count.
     * @example
     * // Count the number of Verifications
     * const count = await prisma.verification.count({
     *   where: {
     *     // ... the filter for the Verifications we want to count
     *   }
     * })
    **/
    count<T extends VerificationCountArgs>(
      args?: Subset<T, VerificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationAggregateArgs>(args: Subset<T, VerificationAggregateArgs>): Prisma.PrismaPromise<GetVerificationAggregateType<T>>

    /**
     * Group by Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VerificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationGroupByArgs['orderBy'] }
        : { orderBy?: VerificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VerificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Verification model
   */
  readonly fields: VerificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Verification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Verification model
   */
  interface VerificationFieldRefs {
    readonly id: FieldRef<"Verification", 'String'>
    readonly identifier: FieldRef<"Verification", 'String'>
    readonly value: FieldRef<"Verification", 'String'>
    readonly expiresAt: FieldRef<"Verification", 'DateTime'>
    readonly createdAt: FieldRef<"Verification", 'DateTime'>
    readonly updatedAt: FieldRef<"Verification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Verification findUnique
   */
  export type VerificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification findUniqueOrThrow
   */
  export type VerificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification findFirst
   */
  export type VerificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification findFirstOrThrow
   */
  export type VerificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification findMany
   */
  export type VerificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verifications to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification create
   */
  export type VerificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data needed to create a Verification.
     */
    data: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>
  }

  /**
   * Verification createMany
   */
  export type VerificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Verifications.
     */
    data: VerificationCreateManyInput | VerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Verification createManyAndReturn
   */
  export type VerificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data used to create many Verifications.
     */
    data: VerificationCreateManyInput | VerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Verification update
   */
  export type VerificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data needed to update a Verification.
     */
    data: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>
    /**
     * Choose, which Verification to update.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification updateMany
   */
  export type VerificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Verifications.
     */
    data: XOR<VerificationUpdateManyMutationInput, VerificationUncheckedUpdateManyInput>
    /**
     * Filter which Verifications to update
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to update.
     */
    limit?: number
  }

  /**
   * Verification updateManyAndReturn
   */
  export type VerificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data used to update Verifications.
     */
    data: XOR<VerificationUpdateManyMutationInput, VerificationUncheckedUpdateManyInput>
    /**
     * Filter which Verifications to update
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to update.
     */
    limit?: number
  }

  /**
   * Verification upsert
   */
  export type VerificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The filter to search for the Verification to update in case it exists.
     */
    where: VerificationWhereUniqueInput
    /**
     * In case the Verification found by the `where` argument doesn't exist, create a new Verification with this data.
     */
    create: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>
    /**
     * In case the Verification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>
  }

  /**
   * Verification delete
   */
  export type VerificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter which Verification to delete.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification deleteMany
   */
  export type VerificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Verifications to delete
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to delete.
     */
    limit?: number
  }

  /**
   * Verification without action
   */
  export type VerificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const PlayerScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    username: 'username',
    level: 'level',
    xp: 'xp',
    careerPath: 'careerPath',
    credits: 'credits',
    kills: 'kills',
    bankruptcies: 'bankruptcies',
    ticketsResolved: 'ticketsResolved',
    correctBounces: 'correctBounces',
    incorrectBounces: 'incorrectBounces',
    incorrectResolves: 'incorrectResolves',
    lifetimeCreditsEarned: 'lifetimeCreditsEarned',
    lifetimeTicketsHandled: 'lifetimeTicketsHandled',
    lastActiveAt: 'lastActiveAt',
    queuePenaltyUntil: 'queuePenaltyUntil',
    nextTicketAt: 'nextTicketAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PlayerScalarFieldEnum = (typeof PlayerScalarFieldEnum)[keyof typeof PlayerScalarFieldEnum]


  export const TicketScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    category: 'category',
    severity: 'severity',
    difficulty: 'difficulty',
    status: 'status',
    maxValue: 'maxValue',
    baseXp: 'baseXp',
    successMessage: 'successMessage',
    failureMessage: 'failureMessage',
    assignedToId: 'assignedToId',
    lastSentById: 'lastSentById',
    attackSourcePlayerId: 'attackSourcePlayerId',
    pvpAttackId: 'pvpAttackId',
    bounceCount: 'bounceCount',
    abandonmentPenaltyApplied: 'abandonmentPenaltyApplied',
    abandonmentPenaltyAt: 'abandonmentPenaltyAt',
    resolvedAt: 'resolvedAt',
    expiredAt: 'expiredAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TicketScalarFieldEnum = (typeof TicketScalarFieldEnum)[keyof typeof TicketScalarFieldEnum]


  export const TicketTemplateScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    category: 'category',
    severity: 'severity',
    difficulty: 'difficulty',
    maxValue: 'maxValue',
    baseXp: 'baseXp',
    successMessage: 'successMessage',
    failureMessage: 'failureMessage',
    active: 'active',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TicketTemplateScalarFieldEnum = (typeof TicketTemplateScalarFieldEnum)[keyof typeof TicketTemplateScalarFieldEnum]


  export const PvPAttackScalarFieldEnum: {
    id: 'id',
    type: 'type',
    status: 'status',
    cost: 'cost',
    attackerId: 'attackerId',
    targetId: 'targetId',
    causedBankruptcy: 'causedBankruptcy',
    completedAt: 'completedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PvPAttackScalarFieldEnum = (typeof PvPAttackScalarFieldEnum)[keyof typeof PvPAttackScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    emailVerified: 'emailVerified',
    image: 'image',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    expiresAt: 'expiresAt',
    token: 'token',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    userId: 'userId'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    accountId: 'accountId',
    providerId: 'providerId',
    userId: 'userId',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    idToken: 'idToken',
    accessTokenExpiresAt: 'accessTokenExpiresAt',
    refreshTokenExpiresAt: 'refreshTokenExpiresAt',
    scope: 'scope',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const VerificationScalarFieldEnum: {
    id: 'id',
    identifier: 'identifier',
    value: 'value',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VerificationScalarFieldEnum = (typeof VerificationScalarFieldEnum)[keyof typeof VerificationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'CareerPath'
   */
  export type EnumCareerPathFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CareerPath'>
    


  /**
   * Reference to a field of type 'CareerPath[]'
   */
  export type ListEnumCareerPathFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CareerPath[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'TicketCategory'
   */
  export type EnumTicketCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TicketCategory'>
    


  /**
   * Reference to a field of type 'TicketCategory[]'
   */
  export type ListEnumTicketCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TicketCategory[]'>
    


  /**
   * Reference to a field of type 'TicketSeverity'
   */
  export type EnumTicketSeverityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TicketSeverity'>
    


  /**
   * Reference to a field of type 'TicketSeverity[]'
   */
  export type ListEnumTicketSeverityFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TicketSeverity[]'>
    


  /**
   * Reference to a field of type 'TicketStatus'
   */
  export type EnumTicketStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TicketStatus'>
    


  /**
   * Reference to a field of type 'TicketStatus[]'
   */
  export type ListEnumTicketStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TicketStatus[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'PvPAttackType'
   */
  export type EnumPvPAttackTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PvPAttackType'>
    


  /**
   * Reference to a field of type 'PvPAttackType[]'
   */
  export type ListEnumPvPAttackTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PvPAttackType[]'>
    


  /**
   * Reference to a field of type 'PvPAttackStatus'
   */
  export type EnumPvPAttackStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PvPAttackStatus'>
    


  /**
   * Reference to a field of type 'PvPAttackStatus[]'
   */
  export type ListEnumPvPAttackStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PvPAttackStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type PlayerWhereInput = {
    AND?: PlayerWhereInput | PlayerWhereInput[]
    OR?: PlayerWhereInput[]
    NOT?: PlayerWhereInput | PlayerWhereInput[]
    id?: IntFilter<"Player"> | number
    userId?: StringFilter<"Player"> | string
    username?: StringFilter<"Player"> | string
    level?: IntFilter<"Player"> | number
    xp?: IntFilter<"Player"> | number
    careerPath?: EnumCareerPathNullableFilter<"Player"> | $Enums.CareerPath | null
    credits?: IntFilter<"Player"> | number
    kills?: IntFilter<"Player"> | number
    bankruptcies?: IntFilter<"Player"> | number
    ticketsResolved?: IntFilter<"Player"> | number
    correctBounces?: IntFilter<"Player"> | number
    incorrectBounces?: IntFilter<"Player"> | number
    incorrectResolves?: IntFilter<"Player"> | number
    lifetimeCreditsEarned?: IntFilter<"Player"> | number
    lifetimeTicketsHandled?: IntFilter<"Player"> | number
    lastActiveAt?: DateTimeFilter<"Player"> | Date | string
    queuePenaltyUntil?: DateTimeNullableFilter<"Player"> | Date | string | null
    nextTicketAt?: DateTimeNullableFilter<"Player"> | Date | string | null
    createdAt?: DateTimeFilter<"Player"> | Date | string
    updatedAt?: DateTimeFilter<"Player"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    attacksSent?: PvPAttackListRelationFilter
    attacksReceived?: PvPAttackListRelationFilter
    attackTickets?: TicketListRelationFilter
    assignedTickets?: TicketListRelationFilter
    sentTickets?: TicketListRelationFilter
  }

  export type PlayerOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    username?: SortOrder
    level?: SortOrder
    xp?: SortOrder
    careerPath?: SortOrderInput | SortOrder
    credits?: SortOrder
    kills?: SortOrder
    bankruptcies?: SortOrder
    ticketsResolved?: SortOrder
    correctBounces?: SortOrder
    incorrectBounces?: SortOrder
    incorrectResolves?: SortOrder
    lifetimeCreditsEarned?: SortOrder
    lifetimeTicketsHandled?: SortOrder
    lastActiveAt?: SortOrder
    queuePenaltyUntil?: SortOrderInput | SortOrder
    nextTicketAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    attacksSent?: PvPAttackOrderByRelationAggregateInput
    attacksReceived?: PvPAttackOrderByRelationAggregateInput
    attackTickets?: TicketOrderByRelationAggregateInput
    assignedTickets?: TicketOrderByRelationAggregateInput
    sentTickets?: TicketOrderByRelationAggregateInput
  }

  export type PlayerWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId?: string
    username?: string
    AND?: PlayerWhereInput | PlayerWhereInput[]
    OR?: PlayerWhereInput[]
    NOT?: PlayerWhereInput | PlayerWhereInput[]
    level?: IntFilter<"Player"> | number
    xp?: IntFilter<"Player"> | number
    careerPath?: EnumCareerPathNullableFilter<"Player"> | $Enums.CareerPath | null
    credits?: IntFilter<"Player"> | number
    kills?: IntFilter<"Player"> | number
    bankruptcies?: IntFilter<"Player"> | number
    ticketsResolved?: IntFilter<"Player"> | number
    correctBounces?: IntFilter<"Player"> | number
    incorrectBounces?: IntFilter<"Player"> | number
    incorrectResolves?: IntFilter<"Player"> | number
    lifetimeCreditsEarned?: IntFilter<"Player"> | number
    lifetimeTicketsHandled?: IntFilter<"Player"> | number
    lastActiveAt?: DateTimeFilter<"Player"> | Date | string
    queuePenaltyUntil?: DateTimeNullableFilter<"Player"> | Date | string | null
    nextTicketAt?: DateTimeNullableFilter<"Player"> | Date | string | null
    createdAt?: DateTimeFilter<"Player"> | Date | string
    updatedAt?: DateTimeFilter<"Player"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    attacksSent?: PvPAttackListRelationFilter
    attacksReceived?: PvPAttackListRelationFilter
    attackTickets?: TicketListRelationFilter
    assignedTickets?: TicketListRelationFilter
    sentTickets?: TicketListRelationFilter
  }, "id" | "userId" | "username">

  export type PlayerOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    username?: SortOrder
    level?: SortOrder
    xp?: SortOrder
    careerPath?: SortOrderInput | SortOrder
    credits?: SortOrder
    kills?: SortOrder
    bankruptcies?: SortOrder
    ticketsResolved?: SortOrder
    correctBounces?: SortOrder
    incorrectBounces?: SortOrder
    incorrectResolves?: SortOrder
    lifetimeCreditsEarned?: SortOrder
    lifetimeTicketsHandled?: SortOrder
    lastActiveAt?: SortOrder
    queuePenaltyUntil?: SortOrderInput | SortOrder
    nextTicketAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PlayerCountOrderByAggregateInput
    _avg?: PlayerAvgOrderByAggregateInput
    _max?: PlayerMaxOrderByAggregateInput
    _min?: PlayerMinOrderByAggregateInput
    _sum?: PlayerSumOrderByAggregateInput
  }

  export type PlayerScalarWhereWithAggregatesInput = {
    AND?: PlayerScalarWhereWithAggregatesInput | PlayerScalarWhereWithAggregatesInput[]
    OR?: PlayerScalarWhereWithAggregatesInput[]
    NOT?: PlayerScalarWhereWithAggregatesInput | PlayerScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Player"> | number
    userId?: StringWithAggregatesFilter<"Player"> | string
    username?: StringWithAggregatesFilter<"Player"> | string
    level?: IntWithAggregatesFilter<"Player"> | number
    xp?: IntWithAggregatesFilter<"Player"> | number
    careerPath?: EnumCareerPathNullableWithAggregatesFilter<"Player"> | $Enums.CareerPath | null
    credits?: IntWithAggregatesFilter<"Player"> | number
    kills?: IntWithAggregatesFilter<"Player"> | number
    bankruptcies?: IntWithAggregatesFilter<"Player"> | number
    ticketsResolved?: IntWithAggregatesFilter<"Player"> | number
    correctBounces?: IntWithAggregatesFilter<"Player"> | number
    incorrectBounces?: IntWithAggregatesFilter<"Player"> | number
    incorrectResolves?: IntWithAggregatesFilter<"Player"> | number
    lifetimeCreditsEarned?: IntWithAggregatesFilter<"Player"> | number
    lifetimeTicketsHandled?: IntWithAggregatesFilter<"Player"> | number
    lastActiveAt?: DateTimeWithAggregatesFilter<"Player"> | Date | string
    queuePenaltyUntil?: DateTimeNullableWithAggregatesFilter<"Player"> | Date | string | null
    nextTicketAt?: DateTimeNullableWithAggregatesFilter<"Player"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Player"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Player"> | Date | string
  }

  export type TicketWhereInput = {
    AND?: TicketWhereInput | TicketWhereInput[]
    OR?: TicketWhereInput[]
    NOT?: TicketWhereInput | TicketWhereInput[]
    id?: IntFilter<"Ticket"> | number
    title?: StringFilter<"Ticket"> | string
    description?: StringFilter<"Ticket"> | string
    category?: EnumTicketCategoryFilter<"Ticket"> | $Enums.TicketCategory
    severity?: EnumTicketSeverityFilter<"Ticket"> | $Enums.TicketSeverity
    difficulty?: IntFilter<"Ticket"> | number
    status?: EnumTicketStatusFilter<"Ticket"> | $Enums.TicketStatus
    maxValue?: IntFilter<"Ticket"> | number
    baseXp?: IntFilter<"Ticket"> | number
    successMessage?: StringNullableFilter<"Ticket"> | string | null
    failureMessage?: StringNullableFilter<"Ticket"> | string | null
    assignedToId?: IntFilter<"Ticket"> | number
    lastSentById?: IntNullableFilter<"Ticket"> | number | null
    attackSourcePlayerId?: IntNullableFilter<"Ticket"> | number | null
    pvpAttackId?: IntNullableFilter<"Ticket"> | number | null
    bounceCount?: IntFilter<"Ticket"> | number
    abandonmentPenaltyApplied?: BoolFilter<"Ticket"> | boolean
    abandonmentPenaltyAt?: DateTimeNullableFilter<"Ticket"> | Date | string | null
    resolvedAt?: DateTimeNullableFilter<"Ticket"> | Date | string | null
    expiredAt?: DateTimeNullableFilter<"Ticket"> | Date | string | null
    createdAt?: DateTimeFilter<"Ticket"> | Date | string
    updatedAt?: DateTimeFilter<"Ticket"> | Date | string
    assignedTo?: XOR<PlayerScalarRelationFilter, PlayerWhereInput>
    lastSentBy?: XOR<PlayerNullableScalarRelationFilter, PlayerWhereInput> | null
    attackSourcePlayer?: XOR<PlayerNullableScalarRelationFilter, PlayerWhereInput> | null
    pvpAttack?: XOR<PvPAttackNullableScalarRelationFilter, PvPAttackWhereInput> | null
  }

  export type TicketOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    severity?: SortOrder
    difficulty?: SortOrder
    status?: SortOrder
    maxValue?: SortOrder
    baseXp?: SortOrder
    successMessage?: SortOrderInput | SortOrder
    failureMessage?: SortOrderInput | SortOrder
    assignedToId?: SortOrder
    lastSentById?: SortOrderInput | SortOrder
    attackSourcePlayerId?: SortOrderInput | SortOrder
    pvpAttackId?: SortOrderInput | SortOrder
    bounceCount?: SortOrder
    abandonmentPenaltyApplied?: SortOrder
    abandonmentPenaltyAt?: SortOrderInput | SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    expiredAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    assignedTo?: PlayerOrderByWithRelationInput
    lastSentBy?: PlayerOrderByWithRelationInput
    attackSourcePlayer?: PlayerOrderByWithRelationInput
    pvpAttack?: PvPAttackOrderByWithRelationInput
  }

  export type TicketWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TicketWhereInput | TicketWhereInput[]
    OR?: TicketWhereInput[]
    NOT?: TicketWhereInput | TicketWhereInput[]
    title?: StringFilter<"Ticket"> | string
    description?: StringFilter<"Ticket"> | string
    category?: EnumTicketCategoryFilter<"Ticket"> | $Enums.TicketCategory
    severity?: EnumTicketSeverityFilter<"Ticket"> | $Enums.TicketSeverity
    difficulty?: IntFilter<"Ticket"> | number
    status?: EnumTicketStatusFilter<"Ticket"> | $Enums.TicketStatus
    maxValue?: IntFilter<"Ticket"> | number
    baseXp?: IntFilter<"Ticket"> | number
    successMessage?: StringNullableFilter<"Ticket"> | string | null
    failureMessage?: StringNullableFilter<"Ticket"> | string | null
    assignedToId?: IntFilter<"Ticket"> | number
    lastSentById?: IntNullableFilter<"Ticket"> | number | null
    attackSourcePlayerId?: IntNullableFilter<"Ticket"> | number | null
    pvpAttackId?: IntNullableFilter<"Ticket"> | number | null
    bounceCount?: IntFilter<"Ticket"> | number
    abandonmentPenaltyApplied?: BoolFilter<"Ticket"> | boolean
    abandonmentPenaltyAt?: DateTimeNullableFilter<"Ticket"> | Date | string | null
    resolvedAt?: DateTimeNullableFilter<"Ticket"> | Date | string | null
    expiredAt?: DateTimeNullableFilter<"Ticket"> | Date | string | null
    createdAt?: DateTimeFilter<"Ticket"> | Date | string
    updatedAt?: DateTimeFilter<"Ticket"> | Date | string
    assignedTo?: XOR<PlayerScalarRelationFilter, PlayerWhereInput>
    lastSentBy?: XOR<PlayerNullableScalarRelationFilter, PlayerWhereInput> | null
    attackSourcePlayer?: XOR<PlayerNullableScalarRelationFilter, PlayerWhereInput> | null
    pvpAttack?: XOR<PvPAttackNullableScalarRelationFilter, PvPAttackWhereInput> | null
  }, "id">

  export type TicketOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    severity?: SortOrder
    difficulty?: SortOrder
    status?: SortOrder
    maxValue?: SortOrder
    baseXp?: SortOrder
    successMessage?: SortOrderInput | SortOrder
    failureMessage?: SortOrderInput | SortOrder
    assignedToId?: SortOrder
    lastSentById?: SortOrderInput | SortOrder
    attackSourcePlayerId?: SortOrderInput | SortOrder
    pvpAttackId?: SortOrderInput | SortOrder
    bounceCount?: SortOrder
    abandonmentPenaltyApplied?: SortOrder
    abandonmentPenaltyAt?: SortOrderInput | SortOrder
    resolvedAt?: SortOrderInput | SortOrder
    expiredAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TicketCountOrderByAggregateInput
    _avg?: TicketAvgOrderByAggregateInput
    _max?: TicketMaxOrderByAggregateInput
    _min?: TicketMinOrderByAggregateInput
    _sum?: TicketSumOrderByAggregateInput
  }

  export type TicketScalarWhereWithAggregatesInput = {
    AND?: TicketScalarWhereWithAggregatesInput | TicketScalarWhereWithAggregatesInput[]
    OR?: TicketScalarWhereWithAggregatesInput[]
    NOT?: TicketScalarWhereWithAggregatesInput | TicketScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Ticket"> | number
    title?: StringWithAggregatesFilter<"Ticket"> | string
    description?: StringWithAggregatesFilter<"Ticket"> | string
    category?: EnumTicketCategoryWithAggregatesFilter<"Ticket"> | $Enums.TicketCategory
    severity?: EnumTicketSeverityWithAggregatesFilter<"Ticket"> | $Enums.TicketSeverity
    difficulty?: IntWithAggregatesFilter<"Ticket"> | number
    status?: EnumTicketStatusWithAggregatesFilter<"Ticket"> | $Enums.TicketStatus
    maxValue?: IntWithAggregatesFilter<"Ticket"> | number
    baseXp?: IntWithAggregatesFilter<"Ticket"> | number
    successMessage?: StringNullableWithAggregatesFilter<"Ticket"> | string | null
    failureMessage?: StringNullableWithAggregatesFilter<"Ticket"> | string | null
    assignedToId?: IntWithAggregatesFilter<"Ticket"> | number
    lastSentById?: IntNullableWithAggregatesFilter<"Ticket"> | number | null
    attackSourcePlayerId?: IntNullableWithAggregatesFilter<"Ticket"> | number | null
    pvpAttackId?: IntNullableWithAggregatesFilter<"Ticket"> | number | null
    bounceCount?: IntWithAggregatesFilter<"Ticket"> | number
    abandonmentPenaltyApplied?: BoolWithAggregatesFilter<"Ticket"> | boolean
    abandonmentPenaltyAt?: DateTimeNullableWithAggregatesFilter<"Ticket"> | Date | string | null
    resolvedAt?: DateTimeNullableWithAggregatesFilter<"Ticket"> | Date | string | null
    expiredAt?: DateTimeNullableWithAggregatesFilter<"Ticket"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Ticket"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Ticket"> | Date | string
  }

  export type TicketTemplateWhereInput = {
    AND?: TicketTemplateWhereInput | TicketTemplateWhereInput[]
    OR?: TicketTemplateWhereInput[]
    NOT?: TicketTemplateWhereInput | TicketTemplateWhereInput[]
    id?: IntFilter<"TicketTemplate"> | number
    title?: StringFilter<"TicketTemplate"> | string
    description?: StringFilter<"TicketTemplate"> | string
    category?: EnumTicketCategoryFilter<"TicketTemplate"> | $Enums.TicketCategory
    severity?: EnumTicketSeverityFilter<"TicketTemplate"> | $Enums.TicketSeverity
    difficulty?: IntFilter<"TicketTemplate"> | number
    maxValue?: IntFilter<"TicketTemplate"> | number
    baseXp?: IntFilter<"TicketTemplate"> | number
    successMessage?: StringNullableFilter<"TicketTemplate"> | string | null
    failureMessage?: StringNullableFilter<"TicketTemplate"> | string | null
    active?: BoolFilter<"TicketTemplate"> | boolean
    createdAt?: DateTimeFilter<"TicketTemplate"> | Date | string
    updatedAt?: DateTimeFilter<"TicketTemplate"> | Date | string
  }

  export type TicketTemplateOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    severity?: SortOrder
    difficulty?: SortOrder
    maxValue?: SortOrder
    baseXp?: SortOrder
    successMessage?: SortOrderInput | SortOrder
    failureMessage?: SortOrderInput | SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TicketTemplateWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TicketTemplateWhereInput | TicketTemplateWhereInput[]
    OR?: TicketTemplateWhereInput[]
    NOT?: TicketTemplateWhereInput | TicketTemplateWhereInput[]
    title?: StringFilter<"TicketTemplate"> | string
    description?: StringFilter<"TicketTemplate"> | string
    category?: EnumTicketCategoryFilter<"TicketTemplate"> | $Enums.TicketCategory
    severity?: EnumTicketSeverityFilter<"TicketTemplate"> | $Enums.TicketSeverity
    difficulty?: IntFilter<"TicketTemplate"> | number
    maxValue?: IntFilter<"TicketTemplate"> | number
    baseXp?: IntFilter<"TicketTemplate"> | number
    successMessage?: StringNullableFilter<"TicketTemplate"> | string | null
    failureMessage?: StringNullableFilter<"TicketTemplate"> | string | null
    active?: BoolFilter<"TicketTemplate"> | boolean
    createdAt?: DateTimeFilter<"TicketTemplate"> | Date | string
    updatedAt?: DateTimeFilter<"TicketTemplate"> | Date | string
  }, "id">

  export type TicketTemplateOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    severity?: SortOrder
    difficulty?: SortOrder
    maxValue?: SortOrder
    baseXp?: SortOrder
    successMessage?: SortOrderInput | SortOrder
    failureMessage?: SortOrderInput | SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TicketTemplateCountOrderByAggregateInput
    _avg?: TicketTemplateAvgOrderByAggregateInput
    _max?: TicketTemplateMaxOrderByAggregateInput
    _min?: TicketTemplateMinOrderByAggregateInput
    _sum?: TicketTemplateSumOrderByAggregateInput
  }

  export type TicketTemplateScalarWhereWithAggregatesInput = {
    AND?: TicketTemplateScalarWhereWithAggregatesInput | TicketTemplateScalarWhereWithAggregatesInput[]
    OR?: TicketTemplateScalarWhereWithAggregatesInput[]
    NOT?: TicketTemplateScalarWhereWithAggregatesInput | TicketTemplateScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TicketTemplate"> | number
    title?: StringWithAggregatesFilter<"TicketTemplate"> | string
    description?: StringWithAggregatesFilter<"TicketTemplate"> | string
    category?: EnumTicketCategoryWithAggregatesFilter<"TicketTemplate"> | $Enums.TicketCategory
    severity?: EnumTicketSeverityWithAggregatesFilter<"TicketTemplate"> | $Enums.TicketSeverity
    difficulty?: IntWithAggregatesFilter<"TicketTemplate"> | number
    maxValue?: IntWithAggregatesFilter<"TicketTemplate"> | number
    baseXp?: IntWithAggregatesFilter<"TicketTemplate"> | number
    successMessage?: StringNullableWithAggregatesFilter<"TicketTemplate"> | string | null
    failureMessage?: StringNullableWithAggregatesFilter<"TicketTemplate"> | string | null
    active?: BoolWithAggregatesFilter<"TicketTemplate"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"TicketTemplate"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"TicketTemplate"> | Date | string
  }

  export type PvPAttackWhereInput = {
    AND?: PvPAttackWhereInput | PvPAttackWhereInput[]
    OR?: PvPAttackWhereInput[]
    NOT?: PvPAttackWhereInput | PvPAttackWhereInput[]
    id?: IntFilter<"PvPAttack"> | number
    type?: EnumPvPAttackTypeFilter<"PvPAttack"> | $Enums.PvPAttackType
    status?: EnumPvPAttackStatusFilter<"PvPAttack"> | $Enums.PvPAttackStatus
    cost?: IntFilter<"PvPAttack"> | number
    attackerId?: IntFilter<"PvPAttack"> | number
    targetId?: IntFilter<"PvPAttack"> | number
    causedBankruptcy?: BoolFilter<"PvPAttack"> | boolean
    completedAt?: DateTimeNullableFilter<"PvPAttack"> | Date | string | null
    createdAt?: DateTimeFilter<"PvPAttack"> | Date | string
    updatedAt?: DateTimeFilter<"PvPAttack"> | Date | string
    attacker?: XOR<PlayerScalarRelationFilter, PlayerWhereInput>
    target?: XOR<PlayerScalarRelationFilter, PlayerWhereInput>
    tickets?: TicketListRelationFilter
  }

  export type PvPAttackOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    status?: SortOrder
    cost?: SortOrder
    attackerId?: SortOrder
    targetId?: SortOrder
    causedBankruptcy?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    attacker?: PlayerOrderByWithRelationInput
    target?: PlayerOrderByWithRelationInput
    tickets?: TicketOrderByRelationAggregateInput
  }

  export type PvPAttackWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PvPAttackWhereInput | PvPAttackWhereInput[]
    OR?: PvPAttackWhereInput[]
    NOT?: PvPAttackWhereInput | PvPAttackWhereInput[]
    type?: EnumPvPAttackTypeFilter<"PvPAttack"> | $Enums.PvPAttackType
    status?: EnumPvPAttackStatusFilter<"PvPAttack"> | $Enums.PvPAttackStatus
    cost?: IntFilter<"PvPAttack"> | number
    attackerId?: IntFilter<"PvPAttack"> | number
    targetId?: IntFilter<"PvPAttack"> | number
    causedBankruptcy?: BoolFilter<"PvPAttack"> | boolean
    completedAt?: DateTimeNullableFilter<"PvPAttack"> | Date | string | null
    createdAt?: DateTimeFilter<"PvPAttack"> | Date | string
    updatedAt?: DateTimeFilter<"PvPAttack"> | Date | string
    attacker?: XOR<PlayerScalarRelationFilter, PlayerWhereInput>
    target?: XOR<PlayerScalarRelationFilter, PlayerWhereInput>
    tickets?: TicketListRelationFilter
  }, "id">

  export type PvPAttackOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    status?: SortOrder
    cost?: SortOrder
    attackerId?: SortOrder
    targetId?: SortOrder
    causedBankruptcy?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PvPAttackCountOrderByAggregateInput
    _avg?: PvPAttackAvgOrderByAggregateInput
    _max?: PvPAttackMaxOrderByAggregateInput
    _min?: PvPAttackMinOrderByAggregateInput
    _sum?: PvPAttackSumOrderByAggregateInput
  }

  export type PvPAttackScalarWhereWithAggregatesInput = {
    AND?: PvPAttackScalarWhereWithAggregatesInput | PvPAttackScalarWhereWithAggregatesInput[]
    OR?: PvPAttackScalarWhereWithAggregatesInput[]
    NOT?: PvPAttackScalarWhereWithAggregatesInput | PvPAttackScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PvPAttack"> | number
    type?: EnumPvPAttackTypeWithAggregatesFilter<"PvPAttack"> | $Enums.PvPAttackType
    status?: EnumPvPAttackStatusWithAggregatesFilter<"PvPAttack"> | $Enums.PvPAttackStatus
    cost?: IntWithAggregatesFilter<"PvPAttack"> | number
    attackerId?: IntWithAggregatesFilter<"PvPAttack"> | number
    targetId?: IntWithAggregatesFilter<"PvPAttack"> | number
    causedBankruptcy?: BoolWithAggregatesFilter<"PvPAttack"> | boolean
    completedAt?: DateTimeNullableWithAggregatesFilter<"PvPAttack"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PvPAttack"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PvPAttack"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    emailVerified?: BoolFilter<"User"> | boolean
    image?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    sessions?: SessionListRelationFilter
    accounts?: AccountListRelationFilter
    player?: XOR<PlayerNullableScalarRelationFilter, PlayerWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sessions?: SessionOrderByRelationAggregateInput
    accounts?: AccountOrderByRelationAggregateInput
    player?: PlayerOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    emailVerified?: BoolFilter<"User"> | boolean
    image?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    sessions?: SessionListRelationFilter
    accounts?: AccountListRelationFilter
    player?: XOR<PlayerNullableScalarRelationFilter, PlayerWhereInput> | null
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    emailVerified?: BoolWithAggregatesFilter<"User"> | boolean
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    token?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    userId?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    token?: StringWithAggregatesFilter<"Session"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    ipAddress?: StringNullableWithAggregatesFilter<"Session"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"Session"> | string | null
    userId?: StringWithAggregatesFilter<"Session"> | string
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AccountCountOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    accountId?: StringWithAggregatesFilter<"Account"> | string
    providerId?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    accessToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    refreshToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    idToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    password?: StringNullableWithAggregatesFilter<"Account"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
  }

  export type VerificationWhereInput = {
    AND?: VerificationWhereInput | VerificationWhereInput[]
    OR?: VerificationWhereInput[]
    NOT?: VerificationWhereInput | VerificationWhereInput[]
    id?: StringFilter<"Verification"> | string
    identifier?: StringFilter<"Verification"> | string
    value?: StringFilter<"Verification"> | string
    expiresAt?: DateTimeFilter<"Verification"> | Date | string
    createdAt?: DateTimeFilter<"Verification"> | Date | string
    updatedAt?: DateTimeFilter<"Verification"> | Date | string
  }

  export type VerificationOrderByWithRelationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VerificationWhereInput | VerificationWhereInput[]
    OR?: VerificationWhereInput[]
    NOT?: VerificationWhereInput | VerificationWhereInput[]
    identifier?: StringFilter<"Verification"> | string
    value?: StringFilter<"Verification"> | string
    expiresAt?: DateTimeFilter<"Verification"> | Date | string
    createdAt?: DateTimeFilter<"Verification"> | Date | string
    updatedAt?: DateTimeFilter<"Verification"> | Date | string
  }, "id">

  export type VerificationOrderByWithAggregationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VerificationCountOrderByAggregateInput
    _max?: VerificationMaxOrderByAggregateInput
    _min?: VerificationMinOrderByAggregateInput
  }

  export type VerificationScalarWhereWithAggregatesInput = {
    AND?: VerificationScalarWhereWithAggregatesInput | VerificationScalarWhereWithAggregatesInput[]
    OR?: VerificationScalarWhereWithAggregatesInput[]
    NOT?: VerificationScalarWhereWithAggregatesInput | VerificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Verification"> | string
    identifier?: StringWithAggregatesFilter<"Verification"> | string
    value?: StringWithAggregatesFilter<"Verification"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
  }

  export type PlayerCreateInput = {
    username: string
    level?: number
    xp?: number
    careerPath?: $Enums.CareerPath | null
    credits?: number
    kills?: number
    bankruptcies?: number
    ticketsResolved?: number
    correctBounces?: number
    incorrectBounces?: number
    incorrectResolves?: number
    lifetimeCreditsEarned?: number
    lifetimeTicketsHandled?: number
    lastActiveAt?: Date | string
    queuePenaltyUntil?: Date | string | null
    nextTicketAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPlayerInput
    attacksSent?: PvPAttackCreateNestedManyWithoutAttackerInput
    attacksReceived?: PvPAttackCreateNestedManyWithoutTargetInput
    attackTickets?: TicketCreateNestedManyWithoutAttackSourcePlayerInput
    assignedTickets?: TicketCreateNestedManyWithoutAssignedToInput
    sentTickets?: TicketCreateNestedManyWithoutLastSentByInput
  }

  export type PlayerUncheckedCreateInput = {
    id?: number
    userId: string
    username: string
    level?: number
    xp?: number
    careerPath?: $Enums.CareerPath | null
    credits?: number
    kills?: number
    bankruptcies?: number
    ticketsResolved?: number
    correctBounces?: number
    incorrectBounces?: number
    incorrectResolves?: number
    lifetimeCreditsEarned?: number
    lifetimeTicketsHandled?: number
    lastActiveAt?: Date | string
    queuePenaltyUntil?: Date | string | null
    nextTicketAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attacksSent?: PvPAttackUncheckedCreateNestedManyWithoutAttackerInput
    attacksReceived?: PvPAttackUncheckedCreateNestedManyWithoutTargetInput
    attackTickets?: TicketUncheckedCreateNestedManyWithoutAttackSourcePlayerInput
    assignedTickets?: TicketUncheckedCreateNestedManyWithoutAssignedToInput
    sentTickets?: TicketUncheckedCreateNestedManyWithoutLastSentByInput
  }

  export type PlayerUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    xp?: IntFieldUpdateOperationsInput | number
    careerPath?: NullableEnumCareerPathFieldUpdateOperationsInput | $Enums.CareerPath | null
    credits?: IntFieldUpdateOperationsInput | number
    kills?: IntFieldUpdateOperationsInput | number
    bankruptcies?: IntFieldUpdateOperationsInput | number
    ticketsResolved?: IntFieldUpdateOperationsInput | number
    correctBounces?: IntFieldUpdateOperationsInput | number
    incorrectBounces?: IntFieldUpdateOperationsInput | number
    incorrectResolves?: IntFieldUpdateOperationsInput | number
    lifetimeCreditsEarned?: IntFieldUpdateOperationsInput | number
    lifetimeTicketsHandled?: IntFieldUpdateOperationsInput | number
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    queuePenaltyUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextTicketAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPlayerNestedInput
    attacksSent?: PvPAttackUpdateManyWithoutAttackerNestedInput
    attacksReceived?: PvPAttackUpdateManyWithoutTargetNestedInput
    attackTickets?: TicketUpdateManyWithoutAttackSourcePlayerNestedInput
    assignedTickets?: TicketUpdateManyWithoutAssignedToNestedInput
    sentTickets?: TicketUpdateManyWithoutLastSentByNestedInput
  }

  export type PlayerUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    xp?: IntFieldUpdateOperationsInput | number
    careerPath?: NullableEnumCareerPathFieldUpdateOperationsInput | $Enums.CareerPath | null
    credits?: IntFieldUpdateOperationsInput | number
    kills?: IntFieldUpdateOperationsInput | number
    bankruptcies?: IntFieldUpdateOperationsInput | number
    ticketsResolved?: IntFieldUpdateOperationsInput | number
    correctBounces?: IntFieldUpdateOperationsInput | number
    incorrectBounces?: IntFieldUpdateOperationsInput | number
    incorrectResolves?: IntFieldUpdateOperationsInput | number
    lifetimeCreditsEarned?: IntFieldUpdateOperationsInput | number
    lifetimeTicketsHandled?: IntFieldUpdateOperationsInput | number
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    queuePenaltyUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextTicketAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attacksSent?: PvPAttackUncheckedUpdateManyWithoutAttackerNestedInput
    attacksReceived?: PvPAttackUncheckedUpdateManyWithoutTargetNestedInput
    attackTickets?: TicketUncheckedUpdateManyWithoutAttackSourcePlayerNestedInput
    assignedTickets?: TicketUncheckedUpdateManyWithoutAssignedToNestedInput
    sentTickets?: TicketUncheckedUpdateManyWithoutLastSentByNestedInput
  }

  export type PlayerCreateManyInput = {
    id?: number
    userId: string
    username: string
    level?: number
    xp?: number
    careerPath?: $Enums.CareerPath | null
    credits?: number
    kills?: number
    bankruptcies?: number
    ticketsResolved?: number
    correctBounces?: number
    incorrectBounces?: number
    incorrectResolves?: number
    lifetimeCreditsEarned?: number
    lifetimeTicketsHandled?: number
    lastActiveAt?: Date | string
    queuePenaltyUntil?: Date | string | null
    nextTicketAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlayerUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    xp?: IntFieldUpdateOperationsInput | number
    careerPath?: NullableEnumCareerPathFieldUpdateOperationsInput | $Enums.CareerPath | null
    credits?: IntFieldUpdateOperationsInput | number
    kills?: IntFieldUpdateOperationsInput | number
    bankruptcies?: IntFieldUpdateOperationsInput | number
    ticketsResolved?: IntFieldUpdateOperationsInput | number
    correctBounces?: IntFieldUpdateOperationsInput | number
    incorrectBounces?: IntFieldUpdateOperationsInput | number
    incorrectResolves?: IntFieldUpdateOperationsInput | number
    lifetimeCreditsEarned?: IntFieldUpdateOperationsInput | number
    lifetimeTicketsHandled?: IntFieldUpdateOperationsInput | number
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    queuePenaltyUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextTicketAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlayerUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    xp?: IntFieldUpdateOperationsInput | number
    careerPath?: NullableEnumCareerPathFieldUpdateOperationsInput | $Enums.CareerPath | null
    credits?: IntFieldUpdateOperationsInput | number
    kills?: IntFieldUpdateOperationsInput | number
    bankruptcies?: IntFieldUpdateOperationsInput | number
    ticketsResolved?: IntFieldUpdateOperationsInput | number
    correctBounces?: IntFieldUpdateOperationsInput | number
    incorrectBounces?: IntFieldUpdateOperationsInput | number
    incorrectResolves?: IntFieldUpdateOperationsInput | number
    lifetimeCreditsEarned?: IntFieldUpdateOperationsInput | number
    lifetimeTicketsHandled?: IntFieldUpdateOperationsInput | number
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    queuePenaltyUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextTicketAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketCreateInput = {
    title: string
    description: string
    category: $Enums.TicketCategory
    severity?: $Enums.TicketSeverity
    difficulty?: number
    status?: $Enums.TicketStatus
    maxValue: number
    baseXp?: number
    successMessage?: string | null
    failureMessage?: string | null
    bounceCount?: number
    abandonmentPenaltyApplied?: boolean
    abandonmentPenaltyAt?: Date | string | null
    resolvedAt?: Date | string | null
    expiredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedTo: PlayerCreateNestedOneWithoutAssignedTicketsInput
    lastSentBy?: PlayerCreateNestedOneWithoutSentTicketsInput
    attackSourcePlayer?: PlayerCreateNestedOneWithoutAttackTicketsInput
    pvpAttack?: PvPAttackCreateNestedOneWithoutTicketsInput
  }

  export type TicketUncheckedCreateInput = {
    id?: number
    title: string
    description: string
    category: $Enums.TicketCategory
    severity?: $Enums.TicketSeverity
    difficulty?: number
    status?: $Enums.TicketStatus
    maxValue: number
    baseXp?: number
    successMessage?: string | null
    failureMessage?: string | null
    assignedToId: number
    lastSentById?: number | null
    attackSourcePlayerId?: number | null
    pvpAttackId?: number | null
    bounceCount?: number
    abandonmentPenaltyApplied?: boolean
    abandonmentPenaltyAt?: Date | string | null
    resolvedAt?: Date | string | null
    expiredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TicketUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumTicketCategoryFieldUpdateOperationsInput | $Enums.TicketCategory
    severity?: EnumTicketSeverityFieldUpdateOperationsInput | $Enums.TicketSeverity
    difficulty?: IntFieldUpdateOperationsInput | number
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    maxValue?: IntFieldUpdateOperationsInput | number
    baseXp?: IntFieldUpdateOperationsInput | number
    successMessage?: NullableStringFieldUpdateOperationsInput | string | null
    failureMessage?: NullableStringFieldUpdateOperationsInput | string | null
    bounceCount?: IntFieldUpdateOperationsInput | number
    abandonmentPenaltyApplied?: BoolFieldUpdateOperationsInput | boolean
    abandonmentPenaltyAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedTo?: PlayerUpdateOneRequiredWithoutAssignedTicketsNestedInput
    lastSentBy?: PlayerUpdateOneWithoutSentTicketsNestedInput
    attackSourcePlayer?: PlayerUpdateOneWithoutAttackTicketsNestedInput
    pvpAttack?: PvPAttackUpdateOneWithoutTicketsNestedInput
  }

  export type TicketUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumTicketCategoryFieldUpdateOperationsInput | $Enums.TicketCategory
    severity?: EnumTicketSeverityFieldUpdateOperationsInput | $Enums.TicketSeverity
    difficulty?: IntFieldUpdateOperationsInput | number
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    maxValue?: IntFieldUpdateOperationsInput | number
    baseXp?: IntFieldUpdateOperationsInput | number
    successMessage?: NullableStringFieldUpdateOperationsInput | string | null
    failureMessage?: NullableStringFieldUpdateOperationsInput | string | null
    assignedToId?: IntFieldUpdateOperationsInput | number
    lastSentById?: NullableIntFieldUpdateOperationsInput | number | null
    attackSourcePlayerId?: NullableIntFieldUpdateOperationsInput | number | null
    pvpAttackId?: NullableIntFieldUpdateOperationsInput | number | null
    bounceCount?: IntFieldUpdateOperationsInput | number
    abandonmentPenaltyApplied?: BoolFieldUpdateOperationsInput | boolean
    abandonmentPenaltyAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketCreateManyInput = {
    id?: number
    title: string
    description: string
    category: $Enums.TicketCategory
    severity?: $Enums.TicketSeverity
    difficulty?: number
    status?: $Enums.TicketStatus
    maxValue: number
    baseXp?: number
    successMessage?: string | null
    failureMessage?: string | null
    assignedToId: number
    lastSentById?: number | null
    attackSourcePlayerId?: number | null
    pvpAttackId?: number | null
    bounceCount?: number
    abandonmentPenaltyApplied?: boolean
    abandonmentPenaltyAt?: Date | string | null
    resolvedAt?: Date | string | null
    expiredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TicketUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumTicketCategoryFieldUpdateOperationsInput | $Enums.TicketCategory
    severity?: EnumTicketSeverityFieldUpdateOperationsInput | $Enums.TicketSeverity
    difficulty?: IntFieldUpdateOperationsInput | number
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    maxValue?: IntFieldUpdateOperationsInput | number
    baseXp?: IntFieldUpdateOperationsInput | number
    successMessage?: NullableStringFieldUpdateOperationsInput | string | null
    failureMessage?: NullableStringFieldUpdateOperationsInput | string | null
    bounceCount?: IntFieldUpdateOperationsInput | number
    abandonmentPenaltyApplied?: BoolFieldUpdateOperationsInput | boolean
    abandonmentPenaltyAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumTicketCategoryFieldUpdateOperationsInput | $Enums.TicketCategory
    severity?: EnumTicketSeverityFieldUpdateOperationsInput | $Enums.TicketSeverity
    difficulty?: IntFieldUpdateOperationsInput | number
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    maxValue?: IntFieldUpdateOperationsInput | number
    baseXp?: IntFieldUpdateOperationsInput | number
    successMessage?: NullableStringFieldUpdateOperationsInput | string | null
    failureMessage?: NullableStringFieldUpdateOperationsInput | string | null
    assignedToId?: IntFieldUpdateOperationsInput | number
    lastSentById?: NullableIntFieldUpdateOperationsInput | number | null
    attackSourcePlayerId?: NullableIntFieldUpdateOperationsInput | number | null
    pvpAttackId?: NullableIntFieldUpdateOperationsInput | number | null
    bounceCount?: IntFieldUpdateOperationsInput | number
    abandonmentPenaltyApplied?: BoolFieldUpdateOperationsInput | boolean
    abandonmentPenaltyAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketTemplateCreateInput = {
    title: string
    description: string
    category: $Enums.TicketCategory
    severity?: $Enums.TicketSeverity
    difficulty?: number
    maxValue: number
    baseXp?: number
    successMessage?: string | null
    failureMessage?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TicketTemplateUncheckedCreateInput = {
    id?: number
    title: string
    description: string
    category: $Enums.TicketCategory
    severity?: $Enums.TicketSeverity
    difficulty?: number
    maxValue: number
    baseXp?: number
    successMessage?: string | null
    failureMessage?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TicketTemplateUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumTicketCategoryFieldUpdateOperationsInput | $Enums.TicketCategory
    severity?: EnumTicketSeverityFieldUpdateOperationsInput | $Enums.TicketSeverity
    difficulty?: IntFieldUpdateOperationsInput | number
    maxValue?: IntFieldUpdateOperationsInput | number
    baseXp?: IntFieldUpdateOperationsInput | number
    successMessage?: NullableStringFieldUpdateOperationsInput | string | null
    failureMessage?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketTemplateUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumTicketCategoryFieldUpdateOperationsInput | $Enums.TicketCategory
    severity?: EnumTicketSeverityFieldUpdateOperationsInput | $Enums.TicketSeverity
    difficulty?: IntFieldUpdateOperationsInput | number
    maxValue?: IntFieldUpdateOperationsInput | number
    baseXp?: IntFieldUpdateOperationsInput | number
    successMessage?: NullableStringFieldUpdateOperationsInput | string | null
    failureMessage?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketTemplateCreateManyInput = {
    id?: number
    title: string
    description: string
    category: $Enums.TicketCategory
    severity?: $Enums.TicketSeverity
    difficulty?: number
    maxValue: number
    baseXp?: number
    successMessage?: string | null
    failureMessage?: string | null
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TicketTemplateUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumTicketCategoryFieldUpdateOperationsInput | $Enums.TicketCategory
    severity?: EnumTicketSeverityFieldUpdateOperationsInput | $Enums.TicketSeverity
    difficulty?: IntFieldUpdateOperationsInput | number
    maxValue?: IntFieldUpdateOperationsInput | number
    baseXp?: IntFieldUpdateOperationsInput | number
    successMessage?: NullableStringFieldUpdateOperationsInput | string | null
    failureMessage?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketTemplateUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumTicketCategoryFieldUpdateOperationsInput | $Enums.TicketCategory
    severity?: EnumTicketSeverityFieldUpdateOperationsInput | $Enums.TicketSeverity
    difficulty?: IntFieldUpdateOperationsInput | number
    maxValue?: IntFieldUpdateOperationsInput | number
    baseXp?: IntFieldUpdateOperationsInput | number
    successMessage?: NullableStringFieldUpdateOperationsInput | string | null
    failureMessage?: NullableStringFieldUpdateOperationsInput | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PvPAttackCreateInput = {
    type: $Enums.PvPAttackType
    status?: $Enums.PvPAttackStatus
    cost: number
    causedBankruptcy?: boolean
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attacker: PlayerCreateNestedOneWithoutAttacksSentInput
    target: PlayerCreateNestedOneWithoutAttacksReceivedInput
    tickets?: TicketCreateNestedManyWithoutPvpAttackInput
  }

  export type PvPAttackUncheckedCreateInput = {
    id?: number
    type: $Enums.PvPAttackType
    status?: $Enums.PvPAttackStatus
    cost: number
    attackerId: number
    targetId: number
    causedBankruptcy?: boolean
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tickets?: TicketUncheckedCreateNestedManyWithoutPvpAttackInput
  }

  export type PvPAttackUpdateInput = {
    type?: EnumPvPAttackTypeFieldUpdateOperationsInput | $Enums.PvPAttackType
    status?: EnumPvPAttackStatusFieldUpdateOperationsInput | $Enums.PvPAttackStatus
    cost?: IntFieldUpdateOperationsInput | number
    causedBankruptcy?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attacker?: PlayerUpdateOneRequiredWithoutAttacksSentNestedInput
    target?: PlayerUpdateOneRequiredWithoutAttacksReceivedNestedInput
    tickets?: TicketUpdateManyWithoutPvpAttackNestedInput
  }

  export type PvPAttackUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: EnumPvPAttackTypeFieldUpdateOperationsInput | $Enums.PvPAttackType
    status?: EnumPvPAttackStatusFieldUpdateOperationsInput | $Enums.PvPAttackStatus
    cost?: IntFieldUpdateOperationsInput | number
    attackerId?: IntFieldUpdateOperationsInput | number
    targetId?: IntFieldUpdateOperationsInput | number
    causedBankruptcy?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tickets?: TicketUncheckedUpdateManyWithoutPvpAttackNestedInput
  }

  export type PvPAttackCreateManyInput = {
    id?: number
    type: $Enums.PvPAttackType
    status?: $Enums.PvPAttackStatus
    cost: number
    attackerId: number
    targetId: number
    causedBankruptcy?: boolean
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PvPAttackUpdateManyMutationInput = {
    type?: EnumPvPAttackTypeFieldUpdateOperationsInput | $Enums.PvPAttackType
    status?: EnumPvPAttackStatusFieldUpdateOperationsInput | $Enums.PvPAttackStatus
    cost?: IntFieldUpdateOperationsInput | number
    causedBankruptcy?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PvPAttackUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: EnumPvPAttackTypeFieldUpdateOperationsInput | $Enums.PvPAttackType
    status?: EnumPvPAttackStatusFieldUpdateOperationsInput | $Enums.PvPAttackStatus
    cost?: IntFieldUpdateOperationsInput | number
    attackerId?: IntFieldUpdateOperationsInput | number
    targetId?: IntFieldUpdateOperationsInput | number
    causedBankruptcy?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
    player?: PlayerCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    player?: PlayerUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
    player?: PlayerUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    player?: PlayerUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    userId: string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type SessionCreateManyInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    userId: string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type AccountCreateInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateManyInput = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationCreateInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationUncheckedCreateInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationCreateManyInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumCareerPathNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.CareerPath | EnumCareerPathFieldRefInput<$PrismaModel> | null
    in?: $Enums.CareerPath[] | ListEnumCareerPathFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CareerPath[] | ListEnumCareerPathFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCareerPathNullableFilter<$PrismaModel> | $Enums.CareerPath | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type PvPAttackListRelationFilter = {
    every?: PvPAttackWhereInput
    some?: PvPAttackWhereInput
    none?: PvPAttackWhereInput
  }

  export type TicketListRelationFilter = {
    every?: TicketWhereInput
    some?: TicketWhereInput
    none?: TicketWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PvPAttackOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TicketOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PlayerCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    username?: SortOrder
    level?: SortOrder
    xp?: SortOrder
    careerPath?: SortOrder
    credits?: SortOrder
    kills?: SortOrder
    bankruptcies?: SortOrder
    ticketsResolved?: SortOrder
    correctBounces?: SortOrder
    incorrectBounces?: SortOrder
    incorrectResolves?: SortOrder
    lifetimeCreditsEarned?: SortOrder
    lifetimeTicketsHandled?: SortOrder
    lastActiveAt?: SortOrder
    queuePenaltyUntil?: SortOrder
    nextTicketAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlayerAvgOrderByAggregateInput = {
    id?: SortOrder
    level?: SortOrder
    xp?: SortOrder
    credits?: SortOrder
    kills?: SortOrder
    bankruptcies?: SortOrder
    ticketsResolved?: SortOrder
    correctBounces?: SortOrder
    incorrectBounces?: SortOrder
    incorrectResolves?: SortOrder
    lifetimeCreditsEarned?: SortOrder
    lifetimeTicketsHandled?: SortOrder
  }

  export type PlayerMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    username?: SortOrder
    level?: SortOrder
    xp?: SortOrder
    careerPath?: SortOrder
    credits?: SortOrder
    kills?: SortOrder
    bankruptcies?: SortOrder
    ticketsResolved?: SortOrder
    correctBounces?: SortOrder
    incorrectBounces?: SortOrder
    incorrectResolves?: SortOrder
    lifetimeCreditsEarned?: SortOrder
    lifetimeTicketsHandled?: SortOrder
    lastActiveAt?: SortOrder
    queuePenaltyUntil?: SortOrder
    nextTicketAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlayerMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    username?: SortOrder
    level?: SortOrder
    xp?: SortOrder
    careerPath?: SortOrder
    credits?: SortOrder
    kills?: SortOrder
    bankruptcies?: SortOrder
    ticketsResolved?: SortOrder
    correctBounces?: SortOrder
    incorrectBounces?: SortOrder
    incorrectResolves?: SortOrder
    lifetimeCreditsEarned?: SortOrder
    lifetimeTicketsHandled?: SortOrder
    lastActiveAt?: SortOrder
    queuePenaltyUntil?: SortOrder
    nextTicketAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlayerSumOrderByAggregateInput = {
    id?: SortOrder
    level?: SortOrder
    xp?: SortOrder
    credits?: SortOrder
    kills?: SortOrder
    bankruptcies?: SortOrder
    ticketsResolved?: SortOrder
    correctBounces?: SortOrder
    incorrectBounces?: SortOrder
    incorrectResolves?: SortOrder
    lifetimeCreditsEarned?: SortOrder
    lifetimeTicketsHandled?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumCareerPathNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CareerPath | EnumCareerPathFieldRefInput<$PrismaModel> | null
    in?: $Enums.CareerPath[] | ListEnumCareerPathFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CareerPath[] | ListEnumCareerPathFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCareerPathNullableWithAggregatesFilter<$PrismaModel> | $Enums.CareerPath | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumCareerPathNullableFilter<$PrismaModel>
    _max?: NestedEnumCareerPathNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumTicketCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketCategory | EnumTicketCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.TicketCategory[] | ListEnumTicketCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketCategory[] | ListEnumTicketCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketCategoryFilter<$PrismaModel> | $Enums.TicketCategory
  }

  export type EnumTicketSeverityFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketSeverity | EnumTicketSeverityFieldRefInput<$PrismaModel>
    in?: $Enums.TicketSeverity[] | ListEnumTicketSeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketSeverity[] | ListEnumTicketSeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketSeverityFilter<$PrismaModel> | $Enums.TicketSeverity
  }

  export type EnumTicketStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketStatus | EnumTicketStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketStatusFilter<$PrismaModel> | $Enums.TicketStatus
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type PlayerScalarRelationFilter = {
    is?: PlayerWhereInput
    isNot?: PlayerWhereInput
  }

  export type PlayerNullableScalarRelationFilter = {
    is?: PlayerWhereInput | null
    isNot?: PlayerWhereInput | null
  }

  export type PvPAttackNullableScalarRelationFilter = {
    is?: PvPAttackWhereInput | null
    isNot?: PvPAttackWhereInput | null
  }

  export type TicketCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    severity?: SortOrder
    difficulty?: SortOrder
    status?: SortOrder
    maxValue?: SortOrder
    baseXp?: SortOrder
    successMessage?: SortOrder
    failureMessage?: SortOrder
    assignedToId?: SortOrder
    lastSentById?: SortOrder
    attackSourcePlayerId?: SortOrder
    pvpAttackId?: SortOrder
    bounceCount?: SortOrder
    abandonmentPenaltyApplied?: SortOrder
    abandonmentPenaltyAt?: SortOrder
    resolvedAt?: SortOrder
    expiredAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TicketAvgOrderByAggregateInput = {
    id?: SortOrder
    difficulty?: SortOrder
    maxValue?: SortOrder
    baseXp?: SortOrder
    assignedToId?: SortOrder
    lastSentById?: SortOrder
    attackSourcePlayerId?: SortOrder
    pvpAttackId?: SortOrder
    bounceCount?: SortOrder
  }

  export type TicketMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    severity?: SortOrder
    difficulty?: SortOrder
    status?: SortOrder
    maxValue?: SortOrder
    baseXp?: SortOrder
    successMessage?: SortOrder
    failureMessage?: SortOrder
    assignedToId?: SortOrder
    lastSentById?: SortOrder
    attackSourcePlayerId?: SortOrder
    pvpAttackId?: SortOrder
    bounceCount?: SortOrder
    abandonmentPenaltyApplied?: SortOrder
    abandonmentPenaltyAt?: SortOrder
    resolvedAt?: SortOrder
    expiredAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TicketMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    severity?: SortOrder
    difficulty?: SortOrder
    status?: SortOrder
    maxValue?: SortOrder
    baseXp?: SortOrder
    successMessage?: SortOrder
    failureMessage?: SortOrder
    assignedToId?: SortOrder
    lastSentById?: SortOrder
    attackSourcePlayerId?: SortOrder
    pvpAttackId?: SortOrder
    bounceCount?: SortOrder
    abandonmentPenaltyApplied?: SortOrder
    abandonmentPenaltyAt?: SortOrder
    resolvedAt?: SortOrder
    expiredAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TicketSumOrderByAggregateInput = {
    id?: SortOrder
    difficulty?: SortOrder
    maxValue?: SortOrder
    baseXp?: SortOrder
    assignedToId?: SortOrder
    lastSentById?: SortOrder
    attackSourcePlayerId?: SortOrder
    pvpAttackId?: SortOrder
    bounceCount?: SortOrder
  }

  export type EnumTicketCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketCategory | EnumTicketCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.TicketCategory[] | ListEnumTicketCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketCategory[] | ListEnumTicketCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketCategoryWithAggregatesFilter<$PrismaModel> | $Enums.TicketCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTicketCategoryFilter<$PrismaModel>
    _max?: NestedEnumTicketCategoryFilter<$PrismaModel>
  }

  export type EnumTicketSeverityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketSeverity | EnumTicketSeverityFieldRefInput<$PrismaModel>
    in?: $Enums.TicketSeverity[] | ListEnumTicketSeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketSeverity[] | ListEnumTicketSeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketSeverityWithAggregatesFilter<$PrismaModel> | $Enums.TicketSeverity
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTicketSeverityFilter<$PrismaModel>
    _max?: NestedEnumTicketSeverityFilter<$PrismaModel>
  }

  export type EnumTicketStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketStatus | EnumTicketStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketStatusWithAggregatesFilter<$PrismaModel> | $Enums.TicketStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTicketStatusFilter<$PrismaModel>
    _max?: NestedEnumTicketStatusFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type TicketTemplateCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    severity?: SortOrder
    difficulty?: SortOrder
    maxValue?: SortOrder
    baseXp?: SortOrder
    successMessage?: SortOrder
    failureMessage?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TicketTemplateAvgOrderByAggregateInput = {
    id?: SortOrder
    difficulty?: SortOrder
    maxValue?: SortOrder
    baseXp?: SortOrder
  }

  export type TicketTemplateMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    severity?: SortOrder
    difficulty?: SortOrder
    maxValue?: SortOrder
    baseXp?: SortOrder
    successMessage?: SortOrder
    failureMessage?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TicketTemplateMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    category?: SortOrder
    severity?: SortOrder
    difficulty?: SortOrder
    maxValue?: SortOrder
    baseXp?: SortOrder
    successMessage?: SortOrder
    failureMessage?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TicketTemplateSumOrderByAggregateInput = {
    id?: SortOrder
    difficulty?: SortOrder
    maxValue?: SortOrder
    baseXp?: SortOrder
  }

  export type EnumPvPAttackTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PvPAttackType | EnumPvPAttackTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PvPAttackType[] | ListEnumPvPAttackTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PvPAttackType[] | ListEnumPvPAttackTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPvPAttackTypeFilter<$PrismaModel> | $Enums.PvPAttackType
  }

  export type EnumPvPAttackStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PvPAttackStatus | EnumPvPAttackStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PvPAttackStatus[] | ListEnumPvPAttackStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PvPAttackStatus[] | ListEnumPvPAttackStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPvPAttackStatusFilter<$PrismaModel> | $Enums.PvPAttackStatus
  }

  export type PvPAttackCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    status?: SortOrder
    cost?: SortOrder
    attackerId?: SortOrder
    targetId?: SortOrder
    causedBankruptcy?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PvPAttackAvgOrderByAggregateInput = {
    id?: SortOrder
    cost?: SortOrder
    attackerId?: SortOrder
    targetId?: SortOrder
  }

  export type PvPAttackMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    status?: SortOrder
    cost?: SortOrder
    attackerId?: SortOrder
    targetId?: SortOrder
    causedBankruptcy?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PvPAttackMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    status?: SortOrder
    cost?: SortOrder
    attackerId?: SortOrder
    targetId?: SortOrder
    causedBankruptcy?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PvPAttackSumOrderByAggregateInput = {
    id?: SortOrder
    cost?: SortOrder
    attackerId?: SortOrder
    targetId?: SortOrder
  }

  export type EnumPvPAttackTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PvPAttackType | EnumPvPAttackTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PvPAttackType[] | ListEnumPvPAttackTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PvPAttackType[] | ListEnumPvPAttackTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPvPAttackTypeWithAggregatesFilter<$PrismaModel> | $Enums.PvPAttackType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPvPAttackTypeFilter<$PrismaModel>
    _max?: NestedEnumPvPAttackTypeFilter<$PrismaModel>
  }

  export type EnumPvPAttackStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PvPAttackStatus | EnumPvPAttackStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PvPAttackStatus[] | ListEnumPvPAttackStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PvPAttackStatus[] | ListEnumPvPAttackStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPvPAttackStatusWithAggregatesFilter<$PrismaModel> | $Enums.PvPAttackStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPvPAttackStatusFilter<$PrismaModel>
    _max?: NestedEnumPvPAttackStatusFilter<$PrismaModel>
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationCountOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationMaxOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationMinOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserCreateNestedOneWithoutPlayerInput = {
    create?: XOR<UserCreateWithoutPlayerInput, UserUncheckedCreateWithoutPlayerInput>
    connectOrCreate?: UserCreateOrConnectWithoutPlayerInput
    connect?: UserWhereUniqueInput
  }

  export type PvPAttackCreateNestedManyWithoutAttackerInput = {
    create?: XOR<PvPAttackCreateWithoutAttackerInput, PvPAttackUncheckedCreateWithoutAttackerInput> | PvPAttackCreateWithoutAttackerInput[] | PvPAttackUncheckedCreateWithoutAttackerInput[]
    connectOrCreate?: PvPAttackCreateOrConnectWithoutAttackerInput | PvPAttackCreateOrConnectWithoutAttackerInput[]
    createMany?: PvPAttackCreateManyAttackerInputEnvelope
    connect?: PvPAttackWhereUniqueInput | PvPAttackWhereUniqueInput[]
  }

  export type PvPAttackCreateNestedManyWithoutTargetInput = {
    create?: XOR<PvPAttackCreateWithoutTargetInput, PvPAttackUncheckedCreateWithoutTargetInput> | PvPAttackCreateWithoutTargetInput[] | PvPAttackUncheckedCreateWithoutTargetInput[]
    connectOrCreate?: PvPAttackCreateOrConnectWithoutTargetInput | PvPAttackCreateOrConnectWithoutTargetInput[]
    createMany?: PvPAttackCreateManyTargetInputEnvelope
    connect?: PvPAttackWhereUniqueInput | PvPAttackWhereUniqueInput[]
  }

  export type TicketCreateNestedManyWithoutAttackSourcePlayerInput = {
    create?: XOR<TicketCreateWithoutAttackSourcePlayerInput, TicketUncheckedCreateWithoutAttackSourcePlayerInput> | TicketCreateWithoutAttackSourcePlayerInput[] | TicketUncheckedCreateWithoutAttackSourcePlayerInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutAttackSourcePlayerInput | TicketCreateOrConnectWithoutAttackSourcePlayerInput[]
    createMany?: TicketCreateManyAttackSourcePlayerInputEnvelope
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
  }

  export type TicketCreateNestedManyWithoutAssignedToInput = {
    create?: XOR<TicketCreateWithoutAssignedToInput, TicketUncheckedCreateWithoutAssignedToInput> | TicketCreateWithoutAssignedToInput[] | TicketUncheckedCreateWithoutAssignedToInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutAssignedToInput | TicketCreateOrConnectWithoutAssignedToInput[]
    createMany?: TicketCreateManyAssignedToInputEnvelope
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
  }

  export type TicketCreateNestedManyWithoutLastSentByInput = {
    create?: XOR<TicketCreateWithoutLastSentByInput, TicketUncheckedCreateWithoutLastSentByInput> | TicketCreateWithoutLastSentByInput[] | TicketUncheckedCreateWithoutLastSentByInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutLastSentByInput | TicketCreateOrConnectWithoutLastSentByInput[]
    createMany?: TicketCreateManyLastSentByInputEnvelope
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
  }

  export type PvPAttackUncheckedCreateNestedManyWithoutAttackerInput = {
    create?: XOR<PvPAttackCreateWithoutAttackerInput, PvPAttackUncheckedCreateWithoutAttackerInput> | PvPAttackCreateWithoutAttackerInput[] | PvPAttackUncheckedCreateWithoutAttackerInput[]
    connectOrCreate?: PvPAttackCreateOrConnectWithoutAttackerInput | PvPAttackCreateOrConnectWithoutAttackerInput[]
    createMany?: PvPAttackCreateManyAttackerInputEnvelope
    connect?: PvPAttackWhereUniqueInput | PvPAttackWhereUniqueInput[]
  }

  export type PvPAttackUncheckedCreateNestedManyWithoutTargetInput = {
    create?: XOR<PvPAttackCreateWithoutTargetInput, PvPAttackUncheckedCreateWithoutTargetInput> | PvPAttackCreateWithoutTargetInput[] | PvPAttackUncheckedCreateWithoutTargetInput[]
    connectOrCreate?: PvPAttackCreateOrConnectWithoutTargetInput | PvPAttackCreateOrConnectWithoutTargetInput[]
    createMany?: PvPAttackCreateManyTargetInputEnvelope
    connect?: PvPAttackWhereUniqueInput | PvPAttackWhereUniqueInput[]
  }

  export type TicketUncheckedCreateNestedManyWithoutAttackSourcePlayerInput = {
    create?: XOR<TicketCreateWithoutAttackSourcePlayerInput, TicketUncheckedCreateWithoutAttackSourcePlayerInput> | TicketCreateWithoutAttackSourcePlayerInput[] | TicketUncheckedCreateWithoutAttackSourcePlayerInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutAttackSourcePlayerInput | TicketCreateOrConnectWithoutAttackSourcePlayerInput[]
    createMany?: TicketCreateManyAttackSourcePlayerInputEnvelope
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
  }

  export type TicketUncheckedCreateNestedManyWithoutAssignedToInput = {
    create?: XOR<TicketCreateWithoutAssignedToInput, TicketUncheckedCreateWithoutAssignedToInput> | TicketCreateWithoutAssignedToInput[] | TicketUncheckedCreateWithoutAssignedToInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutAssignedToInput | TicketCreateOrConnectWithoutAssignedToInput[]
    createMany?: TicketCreateManyAssignedToInputEnvelope
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
  }

  export type TicketUncheckedCreateNestedManyWithoutLastSentByInput = {
    create?: XOR<TicketCreateWithoutLastSentByInput, TicketUncheckedCreateWithoutLastSentByInput> | TicketCreateWithoutLastSentByInput[] | TicketUncheckedCreateWithoutLastSentByInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutLastSentByInput | TicketCreateOrConnectWithoutLastSentByInput[]
    createMany?: TicketCreateManyLastSentByInputEnvelope
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableEnumCareerPathFieldUpdateOperationsInput = {
    set?: $Enums.CareerPath | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutPlayerNestedInput = {
    create?: XOR<UserCreateWithoutPlayerInput, UserUncheckedCreateWithoutPlayerInput>
    connectOrCreate?: UserCreateOrConnectWithoutPlayerInput
    upsert?: UserUpsertWithoutPlayerInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPlayerInput, UserUpdateWithoutPlayerInput>, UserUncheckedUpdateWithoutPlayerInput>
  }

  export type PvPAttackUpdateManyWithoutAttackerNestedInput = {
    create?: XOR<PvPAttackCreateWithoutAttackerInput, PvPAttackUncheckedCreateWithoutAttackerInput> | PvPAttackCreateWithoutAttackerInput[] | PvPAttackUncheckedCreateWithoutAttackerInput[]
    connectOrCreate?: PvPAttackCreateOrConnectWithoutAttackerInput | PvPAttackCreateOrConnectWithoutAttackerInput[]
    upsert?: PvPAttackUpsertWithWhereUniqueWithoutAttackerInput | PvPAttackUpsertWithWhereUniqueWithoutAttackerInput[]
    createMany?: PvPAttackCreateManyAttackerInputEnvelope
    set?: PvPAttackWhereUniqueInput | PvPAttackWhereUniqueInput[]
    disconnect?: PvPAttackWhereUniqueInput | PvPAttackWhereUniqueInput[]
    delete?: PvPAttackWhereUniqueInput | PvPAttackWhereUniqueInput[]
    connect?: PvPAttackWhereUniqueInput | PvPAttackWhereUniqueInput[]
    update?: PvPAttackUpdateWithWhereUniqueWithoutAttackerInput | PvPAttackUpdateWithWhereUniqueWithoutAttackerInput[]
    updateMany?: PvPAttackUpdateManyWithWhereWithoutAttackerInput | PvPAttackUpdateManyWithWhereWithoutAttackerInput[]
    deleteMany?: PvPAttackScalarWhereInput | PvPAttackScalarWhereInput[]
  }

  export type PvPAttackUpdateManyWithoutTargetNestedInput = {
    create?: XOR<PvPAttackCreateWithoutTargetInput, PvPAttackUncheckedCreateWithoutTargetInput> | PvPAttackCreateWithoutTargetInput[] | PvPAttackUncheckedCreateWithoutTargetInput[]
    connectOrCreate?: PvPAttackCreateOrConnectWithoutTargetInput | PvPAttackCreateOrConnectWithoutTargetInput[]
    upsert?: PvPAttackUpsertWithWhereUniqueWithoutTargetInput | PvPAttackUpsertWithWhereUniqueWithoutTargetInput[]
    createMany?: PvPAttackCreateManyTargetInputEnvelope
    set?: PvPAttackWhereUniqueInput | PvPAttackWhereUniqueInput[]
    disconnect?: PvPAttackWhereUniqueInput | PvPAttackWhereUniqueInput[]
    delete?: PvPAttackWhereUniqueInput | PvPAttackWhereUniqueInput[]
    connect?: PvPAttackWhereUniqueInput | PvPAttackWhereUniqueInput[]
    update?: PvPAttackUpdateWithWhereUniqueWithoutTargetInput | PvPAttackUpdateWithWhereUniqueWithoutTargetInput[]
    updateMany?: PvPAttackUpdateManyWithWhereWithoutTargetInput | PvPAttackUpdateManyWithWhereWithoutTargetInput[]
    deleteMany?: PvPAttackScalarWhereInput | PvPAttackScalarWhereInput[]
  }

  export type TicketUpdateManyWithoutAttackSourcePlayerNestedInput = {
    create?: XOR<TicketCreateWithoutAttackSourcePlayerInput, TicketUncheckedCreateWithoutAttackSourcePlayerInput> | TicketCreateWithoutAttackSourcePlayerInput[] | TicketUncheckedCreateWithoutAttackSourcePlayerInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutAttackSourcePlayerInput | TicketCreateOrConnectWithoutAttackSourcePlayerInput[]
    upsert?: TicketUpsertWithWhereUniqueWithoutAttackSourcePlayerInput | TicketUpsertWithWhereUniqueWithoutAttackSourcePlayerInput[]
    createMany?: TicketCreateManyAttackSourcePlayerInputEnvelope
    set?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    disconnect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    delete?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    update?: TicketUpdateWithWhereUniqueWithoutAttackSourcePlayerInput | TicketUpdateWithWhereUniqueWithoutAttackSourcePlayerInput[]
    updateMany?: TicketUpdateManyWithWhereWithoutAttackSourcePlayerInput | TicketUpdateManyWithWhereWithoutAttackSourcePlayerInput[]
    deleteMany?: TicketScalarWhereInput | TicketScalarWhereInput[]
  }

  export type TicketUpdateManyWithoutAssignedToNestedInput = {
    create?: XOR<TicketCreateWithoutAssignedToInput, TicketUncheckedCreateWithoutAssignedToInput> | TicketCreateWithoutAssignedToInput[] | TicketUncheckedCreateWithoutAssignedToInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutAssignedToInput | TicketCreateOrConnectWithoutAssignedToInput[]
    upsert?: TicketUpsertWithWhereUniqueWithoutAssignedToInput | TicketUpsertWithWhereUniqueWithoutAssignedToInput[]
    createMany?: TicketCreateManyAssignedToInputEnvelope
    set?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    disconnect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    delete?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    update?: TicketUpdateWithWhereUniqueWithoutAssignedToInput | TicketUpdateWithWhereUniqueWithoutAssignedToInput[]
    updateMany?: TicketUpdateManyWithWhereWithoutAssignedToInput | TicketUpdateManyWithWhereWithoutAssignedToInput[]
    deleteMany?: TicketScalarWhereInput | TicketScalarWhereInput[]
  }

  export type TicketUpdateManyWithoutLastSentByNestedInput = {
    create?: XOR<TicketCreateWithoutLastSentByInput, TicketUncheckedCreateWithoutLastSentByInput> | TicketCreateWithoutLastSentByInput[] | TicketUncheckedCreateWithoutLastSentByInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutLastSentByInput | TicketCreateOrConnectWithoutLastSentByInput[]
    upsert?: TicketUpsertWithWhereUniqueWithoutLastSentByInput | TicketUpsertWithWhereUniqueWithoutLastSentByInput[]
    createMany?: TicketCreateManyLastSentByInputEnvelope
    set?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    disconnect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    delete?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    update?: TicketUpdateWithWhereUniqueWithoutLastSentByInput | TicketUpdateWithWhereUniqueWithoutLastSentByInput[]
    updateMany?: TicketUpdateManyWithWhereWithoutLastSentByInput | TicketUpdateManyWithWhereWithoutLastSentByInput[]
    deleteMany?: TicketScalarWhereInput | TicketScalarWhereInput[]
  }

  export type PvPAttackUncheckedUpdateManyWithoutAttackerNestedInput = {
    create?: XOR<PvPAttackCreateWithoutAttackerInput, PvPAttackUncheckedCreateWithoutAttackerInput> | PvPAttackCreateWithoutAttackerInput[] | PvPAttackUncheckedCreateWithoutAttackerInput[]
    connectOrCreate?: PvPAttackCreateOrConnectWithoutAttackerInput | PvPAttackCreateOrConnectWithoutAttackerInput[]
    upsert?: PvPAttackUpsertWithWhereUniqueWithoutAttackerInput | PvPAttackUpsertWithWhereUniqueWithoutAttackerInput[]
    createMany?: PvPAttackCreateManyAttackerInputEnvelope
    set?: PvPAttackWhereUniqueInput | PvPAttackWhereUniqueInput[]
    disconnect?: PvPAttackWhereUniqueInput | PvPAttackWhereUniqueInput[]
    delete?: PvPAttackWhereUniqueInput | PvPAttackWhereUniqueInput[]
    connect?: PvPAttackWhereUniqueInput | PvPAttackWhereUniqueInput[]
    update?: PvPAttackUpdateWithWhereUniqueWithoutAttackerInput | PvPAttackUpdateWithWhereUniqueWithoutAttackerInput[]
    updateMany?: PvPAttackUpdateManyWithWhereWithoutAttackerInput | PvPAttackUpdateManyWithWhereWithoutAttackerInput[]
    deleteMany?: PvPAttackScalarWhereInput | PvPAttackScalarWhereInput[]
  }

  export type PvPAttackUncheckedUpdateManyWithoutTargetNestedInput = {
    create?: XOR<PvPAttackCreateWithoutTargetInput, PvPAttackUncheckedCreateWithoutTargetInput> | PvPAttackCreateWithoutTargetInput[] | PvPAttackUncheckedCreateWithoutTargetInput[]
    connectOrCreate?: PvPAttackCreateOrConnectWithoutTargetInput | PvPAttackCreateOrConnectWithoutTargetInput[]
    upsert?: PvPAttackUpsertWithWhereUniqueWithoutTargetInput | PvPAttackUpsertWithWhereUniqueWithoutTargetInput[]
    createMany?: PvPAttackCreateManyTargetInputEnvelope
    set?: PvPAttackWhereUniqueInput | PvPAttackWhereUniqueInput[]
    disconnect?: PvPAttackWhereUniqueInput | PvPAttackWhereUniqueInput[]
    delete?: PvPAttackWhereUniqueInput | PvPAttackWhereUniqueInput[]
    connect?: PvPAttackWhereUniqueInput | PvPAttackWhereUniqueInput[]
    update?: PvPAttackUpdateWithWhereUniqueWithoutTargetInput | PvPAttackUpdateWithWhereUniqueWithoutTargetInput[]
    updateMany?: PvPAttackUpdateManyWithWhereWithoutTargetInput | PvPAttackUpdateManyWithWhereWithoutTargetInput[]
    deleteMany?: PvPAttackScalarWhereInput | PvPAttackScalarWhereInput[]
  }

  export type TicketUncheckedUpdateManyWithoutAttackSourcePlayerNestedInput = {
    create?: XOR<TicketCreateWithoutAttackSourcePlayerInput, TicketUncheckedCreateWithoutAttackSourcePlayerInput> | TicketCreateWithoutAttackSourcePlayerInput[] | TicketUncheckedCreateWithoutAttackSourcePlayerInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutAttackSourcePlayerInput | TicketCreateOrConnectWithoutAttackSourcePlayerInput[]
    upsert?: TicketUpsertWithWhereUniqueWithoutAttackSourcePlayerInput | TicketUpsertWithWhereUniqueWithoutAttackSourcePlayerInput[]
    createMany?: TicketCreateManyAttackSourcePlayerInputEnvelope
    set?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    disconnect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    delete?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    update?: TicketUpdateWithWhereUniqueWithoutAttackSourcePlayerInput | TicketUpdateWithWhereUniqueWithoutAttackSourcePlayerInput[]
    updateMany?: TicketUpdateManyWithWhereWithoutAttackSourcePlayerInput | TicketUpdateManyWithWhereWithoutAttackSourcePlayerInput[]
    deleteMany?: TicketScalarWhereInput | TicketScalarWhereInput[]
  }

  export type TicketUncheckedUpdateManyWithoutAssignedToNestedInput = {
    create?: XOR<TicketCreateWithoutAssignedToInput, TicketUncheckedCreateWithoutAssignedToInput> | TicketCreateWithoutAssignedToInput[] | TicketUncheckedCreateWithoutAssignedToInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutAssignedToInput | TicketCreateOrConnectWithoutAssignedToInput[]
    upsert?: TicketUpsertWithWhereUniqueWithoutAssignedToInput | TicketUpsertWithWhereUniqueWithoutAssignedToInput[]
    createMany?: TicketCreateManyAssignedToInputEnvelope
    set?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    disconnect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    delete?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    update?: TicketUpdateWithWhereUniqueWithoutAssignedToInput | TicketUpdateWithWhereUniqueWithoutAssignedToInput[]
    updateMany?: TicketUpdateManyWithWhereWithoutAssignedToInput | TicketUpdateManyWithWhereWithoutAssignedToInput[]
    deleteMany?: TicketScalarWhereInput | TicketScalarWhereInput[]
  }

  export type TicketUncheckedUpdateManyWithoutLastSentByNestedInput = {
    create?: XOR<TicketCreateWithoutLastSentByInput, TicketUncheckedCreateWithoutLastSentByInput> | TicketCreateWithoutLastSentByInput[] | TicketUncheckedCreateWithoutLastSentByInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutLastSentByInput | TicketCreateOrConnectWithoutLastSentByInput[]
    upsert?: TicketUpsertWithWhereUniqueWithoutLastSentByInput | TicketUpsertWithWhereUniqueWithoutLastSentByInput[]
    createMany?: TicketCreateManyLastSentByInputEnvelope
    set?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    disconnect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    delete?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    update?: TicketUpdateWithWhereUniqueWithoutLastSentByInput | TicketUpdateWithWhereUniqueWithoutLastSentByInput[]
    updateMany?: TicketUpdateManyWithWhereWithoutLastSentByInput | TicketUpdateManyWithWhereWithoutLastSentByInput[]
    deleteMany?: TicketScalarWhereInput | TicketScalarWhereInput[]
  }

  export type PlayerCreateNestedOneWithoutAssignedTicketsInput = {
    create?: XOR<PlayerCreateWithoutAssignedTicketsInput, PlayerUncheckedCreateWithoutAssignedTicketsInput>
    connectOrCreate?: PlayerCreateOrConnectWithoutAssignedTicketsInput
    connect?: PlayerWhereUniqueInput
  }

  export type PlayerCreateNestedOneWithoutSentTicketsInput = {
    create?: XOR<PlayerCreateWithoutSentTicketsInput, PlayerUncheckedCreateWithoutSentTicketsInput>
    connectOrCreate?: PlayerCreateOrConnectWithoutSentTicketsInput
    connect?: PlayerWhereUniqueInput
  }

  export type PlayerCreateNestedOneWithoutAttackTicketsInput = {
    create?: XOR<PlayerCreateWithoutAttackTicketsInput, PlayerUncheckedCreateWithoutAttackTicketsInput>
    connectOrCreate?: PlayerCreateOrConnectWithoutAttackTicketsInput
    connect?: PlayerWhereUniqueInput
  }

  export type PvPAttackCreateNestedOneWithoutTicketsInput = {
    create?: XOR<PvPAttackCreateWithoutTicketsInput, PvPAttackUncheckedCreateWithoutTicketsInput>
    connectOrCreate?: PvPAttackCreateOrConnectWithoutTicketsInput
    connect?: PvPAttackWhereUniqueInput
  }

  export type EnumTicketCategoryFieldUpdateOperationsInput = {
    set?: $Enums.TicketCategory
  }

  export type EnumTicketSeverityFieldUpdateOperationsInput = {
    set?: $Enums.TicketSeverity
  }

  export type EnumTicketStatusFieldUpdateOperationsInput = {
    set?: $Enums.TicketStatus
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type PlayerUpdateOneRequiredWithoutAssignedTicketsNestedInput = {
    create?: XOR<PlayerCreateWithoutAssignedTicketsInput, PlayerUncheckedCreateWithoutAssignedTicketsInput>
    connectOrCreate?: PlayerCreateOrConnectWithoutAssignedTicketsInput
    upsert?: PlayerUpsertWithoutAssignedTicketsInput
    connect?: PlayerWhereUniqueInput
    update?: XOR<XOR<PlayerUpdateToOneWithWhereWithoutAssignedTicketsInput, PlayerUpdateWithoutAssignedTicketsInput>, PlayerUncheckedUpdateWithoutAssignedTicketsInput>
  }

  export type PlayerUpdateOneWithoutSentTicketsNestedInput = {
    create?: XOR<PlayerCreateWithoutSentTicketsInput, PlayerUncheckedCreateWithoutSentTicketsInput>
    connectOrCreate?: PlayerCreateOrConnectWithoutSentTicketsInput
    upsert?: PlayerUpsertWithoutSentTicketsInput
    disconnect?: PlayerWhereInput | boolean
    delete?: PlayerWhereInput | boolean
    connect?: PlayerWhereUniqueInput
    update?: XOR<XOR<PlayerUpdateToOneWithWhereWithoutSentTicketsInput, PlayerUpdateWithoutSentTicketsInput>, PlayerUncheckedUpdateWithoutSentTicketsInput>
  }

  export type PlayerUpdateOneWithoutAttackTicketsNestedInput = {
    create?: XOR<PlayerCreateWithoutAttackTicketsInput, PlayerUncheckedCreateWithoutAttackTicketsInput>
    connectOrCreate?: PlayerCreateOrConnectWithoutAttackTicketsInput
    upsert?: PlayerUpsertWithoutAttackTicketsInput
    disconnect?: PlayerWhereInput | boolean
    delete?: PlayerWhereInput | boolean
    connect?: PlayerWhereUniqueInput
    update?: XOR<XOR<PlayerUpdateToOneWithWhereWithoutAttackTicketsInput, PlayerUpdateWithoutAttackTicketsInput>, PlayerUncheckedUpdateWithoutAttackTicketsInput>
  }

  export type PvPAttackUpdateOneWithoutTicketsNestedInput = {
    create?: XOR<PvPAttackCreateWithoutTicketsInput, PvPAttackUncheckedCreateWithoutTicketsInput>
    connectOrCreate?: PvPAttackCreateOrConnectWithoutTicketsInput
    upsert?: PvPAttackUpsertWithoutTicketsInput
    disconnect?: PvPAttackWhereInput | boolean
    delete?: PvPAttackWhereInput | boolean
    connect?: PvPAttackWhereUniqueInput
    update?: XOR<XOR<PvPAttackUpdateToOneWithWhereWithoutTicketsInput, PvPAttackUpdateWithoutTicketsInput>, PvPAttackUncheckedUpdateWithoutTicketsInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PlayerCreateNestedOneWithoutAttacksSentInput = {
    create?: XOR<PlayerCreateWithoutAttacksSentInput, PlayerUncheckedCreateWithoutAttacksSentInput>
    connectOrCreate?: PlayerCreateOrConnectWithoutAttacksSentInput
    connect?: PlayerWhereUniqueInput
  }

  export type PlayerCreateNestedOneWithoutAttacksReceivedInput = {
    create?: XOR<PlayerCreateWithoutAttacksReceivedInput, PlayerUncheckedCreateWithoutAttacksReceivedInput>
    connectOrCreate?: PlayerCreateOrConnectWithoutAttacksReceivedInput
    connect?: PlayerWhereUniqueInput
  }

  export type TicketCreateNestedManyWithoutPvpAttackInput = {
    create?: XOR<TicketCreateWithoutPvpAttackInput, TicketUncheckedCreateWithoutPvpAttackInput> | TicketCreateWithoutPvpAttackInput[] | TicketUncheckedCreateWithoutPvpAttackInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutPvpAttackInput | TicketCreateOrConnectWithoutPvpAttackInput[]
    createMany?: TicketCreateManyPvpAttackInputEnvelope
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
  }

  export type TicketUncheckedCreateNestedManyWithoutPvpAttackInput = {
    create?: XOR<TicketCreateWithoutPvpAttackInput, TicketUncheckedCreateWithoutPvpAttackInput> | TicketCreateWithoutPvpAttackInput[] | TicketUncheckedCreateWithoutPvpAttackInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutPvpAttackInput | TicketCreateOrConnectWithoutPvpAttackInput[]
    createMany?: TicketCreateManyPvpAttackInputEnvelope
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
  }

  export type EnumPvPAttackTypeFieldUpdateOperationsInput = {
    set?: $Enums.PvPAttackType
  }

  export type EnumPvPAttackStatusFieldUpdateOperationsInput = {
    set?: $Enums.PvPAttackStatus
  }

  export type PlayerUpdateOneRequiredWithoutAttacksSentNestedInput = {
    create?: XOR<PlayerCreateWithoutAttacksSentInput, PlayerUncheckedCreateWithoutAttacksSentInput>
    connectOrCreate?: PlayerCreateOrConnectWithoutAttacksSentInput
    upsert?: PlayerUpsertWithoutAttacksSentInput
    connect?: PlayerWhereUniqueInput
    update?: XOR<XOR<PlayerUpdateToOneWithWhereWithoutAttacksSentInput, PlayerUpdateWithoutAttacksSentInput>, PlayerUncheckedUpdateWithoutAttacksSentInput>
  }

  export type PlayerUpdateOneRequiredWithoutAttacksReceivedNestedInput = {
    create?: XOR<PlayerCreateWithoutAttacksReceivedInput, PlayerUncheckedCreateWithoutAttacksReceivedInput>
    connectOrCreate?: PlayerCreateOrConnectWithoutAttacksReceivedInput
    upsert?: PlayerUpsertWithoutAttacksReceivedInput
    connect?: PlayerWhereUniqueInput
    update?: XOR<XOR<PlayerUpdateToOneWithWhereWithoutAttacksReceivedInput, PlayerUpdateWithoutAttacksReceivedInput>, PlayerUncheckedUpdateWithoutAttacksReceivedInput>
  }

  export type TicketUpdateManyWithoutPvpAttackNestedInput = {
    create?: XOR<TicketCreateWithoutPvpAttackInput, TicketUncheckedCreateWithoutPvpAttackInput> | TicketCreateWithoutPvpAttackInput[] | TicketUncheckedCreateWithoutPvpAttackInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutPvpAttackInput | TicketCreateOrConnectWithoutPvpAttackInput[]
    upsert?: TicketUpsertWithWhereUniqueWithoutPvpAttackInput | TicketUpsertWithWhereUniqueWithoutPvpAttackInput[]
    createMany?: TicketCreateManyPvpAttackInputEnvelope
    set?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    disconnect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    delete?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    update?: TicketUpdateWithWhereUniqueWithoutPvpAttackInput | TicketUpdateWithWhereUniqueWithoutPvpAttackInput[]
    updateMany?: TicketUpdateManyWithWhereWithoutPvpAttackInput | TicketUpdateManyWithWhereWithoutPvpAttackInput[]
    deleteMany?: TicketScalarWhereInput | TicketScalarWhereInput[]
  }

  export type TicketUncheckedUpdateManyWithoutPvpAttackNestedInput = {
    create?: XOR<TicketCreateWithoutPvpAttackInput, TicketUncheckedCreateWithoutPvpAttackInput> | TicketCreateWithoutPvpAttackInput[] | TicketUncheckedCreateWithoutPvpAttackInput[]
    connectOrCreate?: TicketCreateOrConnectWithoutPvpAttackInput | TicketCreateOrConnectWithoutPvpAttackInput[]
    upsert?: TicketUpsertWithWhereUniqueWithoutPvpAttackInput | TicketUpsertWithWhereUniqueWithoutPvpAttackInput[]
    createMany?: TicketCreateManyPvpAttackInputEnvelope
    set?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    disconnect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    delete?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    connect?: TicketWhereUniqueInput | TicketWhereUniqueInput[]
    update?: TicketUpdateWithWhereUniqueWithoutPvpAttackInput | TicketUpdateWithWhereUniqueWithoutPvpAttackInput[]
    updateMany?: TicketUpdateManyWithWhereWithoutPvpAttackInput | TicketUpdateManyWithWhereWithoutPvpAttackInput[]
    deleteMany?: TicketScalarWhereInput | TicketScalarWhereInput[]
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type PlayerCreateNestedOneWithoutUserInput = {
    create?: XOR<PlayerCreateWithoutUserInput, PlayerUncheckedCreateWithoutUserInput>
    connectOrCreate?: PlayerCreateOrConnectWithoutUserInput
    connect?: PlayerWhereUniqueInput
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type PlayerUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<PlayerCreateWithoutUserInput, PlayerUncheckedCreateWithoutUserInput>
    connectOrCreate?: PlayerCreateOrConnectWithoutUserInput
    connect?: PlayerWhereUniqueInput
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type PlayerUpdateOneWithoutUserNestedInput = {
    create?: XOR<PlayerCreateWithoutUserInput, PlayerUncheckedCreateWithoutUserInput>
    connectOrCreate?: PlayerCreateOrConnectWithoutUserInput
    upsert?: PlayerUpsertWithoutUserInput
    disconnect?: PlayerWhereInput | boolean
    delete?: PlayerWhereInput | boolean
    connect?: PlayerWhereUniqueInput
    update?: XOR<XOR<PlayerUpdateToOneWithWhereWithoutUserInput, PlayerUpdateWithoutUserInput>, PlayerUncheckedUpdateWithoutUserInput>
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type PlayerUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<PlayerCreateWithoutUserInput, PlayerUncheckedCreateWithoutUserInput>
    connectOrCreate?: PlayerCreateOrConnectWithoutUserInput
    upsert?: PlayerUpsertWithoutUserInput
    disconnect?: PlayerWhereInput | boolean
    delete?: PlayerWhereInput | boolean
    connect?: PlayerWhereUniqueInput
    update?: XOR<XOR<PlayerUpdateToOneWithWhereWithoutUserInput, PlayerUpdateWithoutUserInput>, PlayerUncheckedUpdateWithoutUserInput>
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumCareerPathNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.CareerPath | EnumCareerPathFieldRefInput<$PrismaModel> | null
    in?: $Enums.CareerPath[] | ListEnumCareerPathFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CareerPath[] | ListEnumCareerPathFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCareerPathNullableFilter<$PrismaModel> | $Enums.CareerPath | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumCareerPathNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CareerPath | EnumCareerPathFieldRefInput<$PrismaModel> | null
    in?: $Enums.CareerPath[] | ListEnumCareerPathFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CareerPath[] | ListEnumCareerPathFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCareerPathNullableWithAggregatesFilter<$PrismaModel> | $Enums.CareerPath | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumCareerPathNullableFilter<$PrismaModel>
    _max?: NestedEnumCareerPathNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumTicketCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketCategory | EnumTicketCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.TicketCategory[] | ListEnumTicketCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketCategory[] | ListEnumTicketCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketCategoryFilter<$PrismaModel> | $Enums.TicketCategory
  }

  export type NestedEnumTicketSeverityFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketSeverity | EnumTicketSeverityFieldRefInput<$PrismaModel>
    in?: $Enums.TicketSeverity[] | ListEnumTicketSeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketSeverity[] | ListEnumTicketSeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketSeverityFilter<$PrismaModel> | $Enums.TicketSeverity
  }

  export type NestedEnumTicketStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketStatus | EnumTicketStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketStatusFilter<$PrismaModel> | $Enums.TicketStatus
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedEnumTicketCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketCategory | EnumTicketCategoryFieldRefInput<$PrismaModel>
    in?: $Enums.TicketCategory[] | ListEnumTicketCategoryFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketCategory[] | ListEnumTicketCategoryFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketCategoryWithAggregatesFilter<$PrismaModel> | $Enums.TicketCategory
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTicketCategoryFilter<$PrismaModel>
    _max?: NestedEnumTicketCategoryFilter<$PrismaModel>
  }

  export type NestedEnumTicketSeverityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketSeverity | EnumTicketSeverityFieldRefInput<$PrismaModel>
    in?: $Enums.TicketSeverity[] | ListEnumTicketSeverityFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketSeverity[] | ListEnumTicketSeverityFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketSeverityWithAggregatesFilter<$PrismaModel> | $Enums.TicketSeverity
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTicketSeverityFilter<$PrismaModel>
    _max?: NestedEnumTicketSeverityFilter<$PrismaModel>
  }

  export type NestedEnumTicketStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TicketStatus | EnumTicketStatusFieldRefInput<$PrismaModel>
    in?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.TicketStatus[] | ListEnumTicketStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumTicketStatusWithAggregatesFilter<$PrismaModel> | $Enums.TicketStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTicketStatusFilter<$PrismaModel>
    _max?: NestedEnumTicketStatusFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumPvPAttackTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PvPAttackType | EnumPvPAttackTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PvPAttackType[] | ListEnumPvPAttackTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PvPAttackType[] | ListEnumPvPAttackTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPvPAttackTypeFilter<$PrismaModel> | $Enums.PvPAttackType
  }

  export type NestedEnumPvPAttackStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PvPAttackStatus | EnumPvPAttackStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PvPAttackStatus[] | ListEnumPvPAttackStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PvPAttackStatus[] | ListEnumPvPAttackStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPvPAttackStatusFilter<$PrismaModel> | $Enums.PvPAttackStatus
  }

  export type NestedEnumPvPAttackTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PvPAttackType | EnumPvPAttackTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PvPAttackType[] | ListEnumPvPAttackTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PvPAttackType[] | ListEnumPvPAttackTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPvPAttackTypeWithAggregatesFilter<$PrismaModel> | $Enums.PvPAttackType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPvPAttackTypeFilter<$PrismaModel>
    _max?: NestedEnumPvPAttackTypeFilter<$PrismaModel>
  }

  export type NestedEnumPvPAttackStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PvPAttackStatus | EnumPvPAttackStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PvPAttackStatus[] | ListEnumPvPAttackStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PvPAttackStatus[] | ListEnumPvPAttackStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPvPAttackStatusWithAggregatesFilter<$PrismaModel> | $Enums.PvPAttackStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPvPAttackStatusFilter<$PrismaModel>
    _max?: NestedEnumPvPAttackStatusFilter<$PrismaModel>
  }

  export type UserCreateWithoutPlayerInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPlayerInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPlayerInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPlayerInput, UserUncheckedCreateWithoutPlayerInput>
  }

  export type PvPAttackCreateWithoutAttackerInput = {
    type: $Enums.PvPAttackType
    status?: $Enums.PvPAttackStatus
    cost: number
    causedBankruptcy?: boolean
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    target: PlayerCreateNestedOneWithoutAttacksReceivedInput
    tickets?: TicketCreateNestedManyWithoutPvpAttackInput
  }

  export type PvPAttackUncheckedCreateWithoutAttackerInput = {
    id?: number
    type: $Enums.PvPAttackType
    status?: $Enums.PvPAttackStatus
    cost: number
    targetId: number
    causedBankruptcy?: boolean
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tickets?: TicketUncheckedCreateNestedManyWithoutPvpAttackInput
  }

  export type PvPAttackCreateOrConnectWithoutAttackerInput = {
    where: PvPAttackWhereUniqueInput
    create: XOR<PvPAttackCreateWithoutAttackerInput, PvPAttackUncheckedCreateWithoutAttackerInput>
  }

  export type PvPAttackCreateManyAttackerInputEnvelope = {
    data: PvPAttackCreateManyAttackerInput | PvPAttackCreateManyAttackerInput[]
    skipDuplicates?: boolean
  }

  export type PvPAttackCreateWithoutTargetInput = {
    type: $Enums.PvPAttackType
    status?: $Enums.PvPAttackStatus
    cost: number
    causedBankruptcy?: boolean
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attacker: PlayerCreateNestedOneWithoutAttacksSentInput
    tickets?: TicketCreateNestedManyWithoutPvpAttackInput
  }

  export type PvPAttackUncheckedCreateWithoutTargetInput = {
    id?: number
    type: $Enums.PvPAttackType
    status?: $Enums.PvPAttackStatus
    cost: number
    attackerId: number
    causedBankruptcy?: boolean
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    tickets?: TicketUncheckedCreateNestedManyWithoutPvpAttackInput
  }

  export type PvPAttackCreateOrConnectWithoutTargetInput = {
    where: PvPAttackWhereUniqueInput
    create: XOR<PvPAttackCreateWithoutTargetInput, PvPAttackUncheckedCreateWithoutTargetInput>
  }

  export type PvPAttackCreateManyTargetInputEnvelope = {
    data: PvPAttackCreateManyTargetInput | PvPAttackCreateManyTargetInput[]
    skipDuplicates?: boolean
  }

  export type TicketCreateWithoutAttackSourcePlayerInput = {
    title: string
    description: string
    category: $Enums.TicketCategory
    severity?: $Enums.TicketSeverity
    difficulty?: number
    status?: $Enums.TicketStatus
    maxValue: number
    baseXp?: number
    successMessage?: string | null
    failureMessage?: string | null
    bounceCount?: number
    abandonmentPenaltyApplied?: boolean
    abandonmentPenaltyAt?: Date | string | null
    resolvedAt?: Date | string | null
    expiredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedTo: PlayerCreateNestedOneWithoutAssignedTicketsInput
    lastSentBy?: PlayerCreateNestedOneWithoutSentTicketsInput
    pvpAttack?: PvPAttackCreateNestedOneWithoutTicketsInput
  }

  export type TicketUncheckedCreateWithoutAttackSourcePlayerInput = {
    id?: number
    title: string
    description: string
    category: $Enums.TicketCategory
    severity?: $Enums.TicketSeverity
    difficulty?: number
    status?: $Enums.TicketStatus
    maxValue: number
    baseXp?: number
    successMessage?: string | null
    failureMessage?: string | null
    assignedToId: number
    lastSentById?: number | null
    pvpAttackId?: number | null
    bounceCount?: number
    abandonmentPenaltyApplied?: boolean
    abandonmentPenaltyAt?: Date | string | null
    resolvedAt?: Date | string | null
    expiredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TicketCreateOrConnectWithoutAttackSourcePlayerInput = {
    where: TicketWhereUniqueInput
    create: XOR<TicketCreateWithoutAttackSourcePlayerInput, TicketUncheckedCreateWithoutAttackSourcePlayerInput>
  }

  export type TicketCreateManyAttackSourcePlayerInputEnvelope = {
    data: TicketCreateManyAttackSourcePlayerInput | TicketCreateManyAttackSourcePlayerInput[]
    skipDuplicates?: boolean
  }

  export type TicketCreateWithoutAssignedToInput = {
    title: string
    description: string
    category: $Enums.TicketCategory
    severity?: $Enums.TicketSeverity
    difficulty?: number
    status?: $Enums.TicketStatus
    maxValue: number
    baseXp?: number
    successMessage?: string | null
    failureMessage?: string | null
    bounceCount?: number
    abandonmentPenaltyApplied?: boolean
    abandonmentPenaltyAt?: Date | string | null
    resolvedAt?: Date | string | null
    expiredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    lastSentBy?: PlayerCreateNestedOneWithoutSentTicketsInput
    attackSourcePlayer?: PlayerCreateNestedOneWithoutAttackTicketsInput
    pvpAttack?: PvPAttackCreateNestedOneWithoutTicketsInput
  }

  export type TicketUncheckedCreateWithoutAssignedToInput = {
    id?: number
    title: string
    description: string
    category: $Enums.TicketCategory
    severity?: $Enums.TicketSeverity
    difficulty?: number
    status?: $Enums.TicketStatus
    maxValue: number
    baseXp?: number
    successMessage?: string | null
    failureMessage?: string | null
    lastSentById?: number | null
    attackSourcePlayerId?: number | null
    pvpAttackId?: number | null
    bounceCount?: number
    abandonmentPenaltyApplied?: boolean
    abandonmentPenaltyAt?: Date | string | null
    resolvedAt?: Date | string | null
    expiredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TicketCreateOrConnectWithoutAssignedToInput = {
    where: TicketWhereUniqueInput
    create: XOR<TicketCreateWithoutAssignedToInput, TicketUncheckedCreateWithoutAssignedToInput>
  }

  export type TicketCreateManyAssignedToInputEnvelope = {
    data: TicketCreateManyAssignedToInput | TicketCreateManyAssignedToInput[]
    skipDuplicates?: boolean
  }

  export type TicketCreateWithoutLastSentByInput = {
    title: string
    description: string
    category: $Enums.TicketCategory
    severity?: $Enums.TicketSeverity
    difficulty?: number
    status?: $Enums.TicketStatus
    maxValue: number
    baseXp?: number
    successMessage?: string | null
    failureMessage?: string | null
    bounceCount?: number
    abandonmentPenaltyApplied?: boolean
    abandonmentPenaltyAt?: Date | string | null
    resolvedAt?: Date | string | null
    expiredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedTo: PlayerCreateNestedOneWithoutAssignedTicketsInput
    attackSourcePlayer?: PlayerCreateNestedOneWithoutAttackTicketsInput
    pvpAttack?: PvPAttackCreateNestedOneWithoutTicketsInput
  }

  export type TicketUncheckedCreateWithoutLastSentByInput = {
    id?: number
    title: string
    description: string
    category: $Enums.TicketCategory
    severity?: $Enums.TicketSeverity
    difficulty?: number
    status?: $Enums.TicketStatus
    maxValue: number
    baseXp?: number
    successMessage?: string | null
    failureMessage?: string | null
    assignedToId: number
    attackSourcePlayerId?: number | null
    pvpAttackId?: number | null
    bounceCount?: number
    abandonmentPenaltyApplied?: boolean
    abandonmentPenaltyAt?: Date | string | null
    resolvedAt?: Date | string | null
    expiredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TicketCreateOrConnectWithoutLastSentByInput = {
    where: TicketWhereUniqueInput
    create: XOR<TicketCreateWithoutLastSentByInput, TicketUncheckedCreateWithoutLastSentByInput>
  }

  export type TicketCreateManyLastSentByInputEnvelope = {
    data: TicketCreateManyLastSentByInput | TicketCreateManyLastSentByInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutPlayerInput = {
    update: XOR<UserUpdateWithoutPlayerInput, UserUncheckedUpdateWithoutPlayerInput>
    create: XOR<UserCreateWithoutPlayerInput, UserUncheckedCreateWithoutPlayerInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPlayerInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPlayerInput, UserUncheckedUpdateWithoutPlayerInput>
  }

  export type UserUpdateWithoutPlayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPlayerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PvPAttackUpsertWithWhereUniqueWithoutAttackerInput = {
    where: PvPAttackWhereUniqueInput
    update: XOR<PvPAttackUpdateWithoutAttackerInput, PvPAttackUncheckedUpdateWithoutAttackerInput>
    create: XOR<PvPAttackCreateWithoutAttackerInput, PvPAttackUncheckedCreateWithoutAttackerInput>
  }

  export type PvPAttackUpdateWithWhereUniqueWithoutAttackerInput = {
    where: PvPAttackWhereUniqueInput
    data: XOR<PvPAttackUpdateWithoutAttackerInput, PvPAttackUncheckedUpdateWithoutAttackerInput>
  }

  export type PvPAttackUpdateManyWithWhereWithoutAttackerInput = {
    where: PvPAttackScalarWhereInput
    data: XOR<PvPAttackUpdateManyMutationInput, PvPAttackUncheckedUpdateManyWithoutAttackerInput>
  }

  export type PvPAttackScalarWhereInput = {
    AND?: PvPAttackScalarWhereInput | PvPAttackScalarWhereInput[]
    OR?: PvPAttackScalarWhereInput[]
    NOT?: PvPAttackScalarWhereInput | PvPAttackScalarWhereInput[]
    id?: IntFilter<"PvPAttack"> | number
    type?: EnumPvPAttackTypeFilter<"PvPAttack"> | $Enums.PvPAttackType
    status?: EnumPvPAttackStatusFilter<"PvPAttack"> | $Enums.PvPAttackStatus
    cost?: IntFilter<"PvPAttack"> | number
    attackerId?: IntFilter<"PvPAttack"> | number
    targetId?: IntFilter<"PvPAttack"> | number
    causedBankruptcy?: BoolFilter<"PvPAttack"> | boolean
    completedAt?: DateTimeNullableFilter<"PvPAttack"> | Date | string | null
    createdAt?: DateTimeFilter<"PvPAttack"> | Date | string
    updatedAt?: DateTimeFilter<"PvPAttack"> | Date | string
  }

  export type PvPAttackUpsertWithWhereUniqueWithoutTargetInput = {
    where: PvPAttackWhereUniqueInput
    update: XOR<PvPAttackUpdateWithoutTargetInput, PvPAttackUncheckedUpdateWithoutTargetInput>
    create: XOR<PvPAttackCreateWithoutTargetInput, PvPAttackUncheckedCreateWithoutTargetInput>
  }

  export type PvPAttackUpdateWithWhereUniqueWithoutTargetInput = {
    where: PvPAttackWhereUniqueInput
    data: XOR<PvPAttackUpdateWithoutTargetInput, PvPAttackUncheckedUpdateWithoutTargetInput>
  }

  export type PvPAttackUpdateManyWithWhereWithoutTargetInput = {
    where: PvPAttackScalarWhereInput
    data: XOR<PvPAttackUpdateManyMutationInput, PvPAttackUncheckedUpdateManyWithoutTargetInput>
  }

  export type TicketUpsertWithWhereUniqueWithoutAttackSourcePlayerInput = {
    where: TicketWhereUniqueInput
    update: XOR<TicketUpdateWithoutAttackSourcePlayerInput, TicketUncheckedUpdateWithoutAttackSourcePlayerInput>
    create: XOR<TicketCreateWithoutAttackSourcePlayerInput, TicketUncheckedCreateWithoutAttackSourcePlayerInput>
  }

  export type TicketUpdateWithWhereUniqueWithoutAttackSourcePlayerInput = {
    where: TicketWhereUniqueInput
    data: XOR<TicketUpdateWithoutAttackSourcePlayerInput, TicketUncheckedUpdateWithoutAttackSourcePlayerInput>
  }

  export type TicketUpdateManyWithWhereWithoutAttackSourcePlayerInput = {
    where: TicketScalarWhereInput
    data: XOR<TicketUpdateManyMutationInput, TicketUncheckedUpdateManyWithoutAttackSourcePlayerInput>
  }

  export type TicketScalarWhereInput = {
    AND?: TicketScalarWhereInput | TicketScalarWhereInput[]
    OR?: TicketScalarWhereInput[]
    NOT?: TicketScalarWhereInput | TicketScalarWhereInput[]
    id?: IntFilter<"Ticket"> | number
    title?: StringFilter<"Ticket"> | string
    description?: StringFilter<"Ticket"> | string
    category?: EnumTicketCategoryFilter<"Ticket"> | $Enums.TicketCategory
    severity?: EnumTicketSeverityFilter<"Ticket"> | $Enums.TicketSeverity
    difficulty?: IntFilter<"Ticket"> | number
    status?: EnumTicketStatusFilter<"Ticket"> | $Enums.TicketStatus
    maxValue?: IntFilter<"Ticket"> | number
    baseXp?: IntFilter<"Ticket"> | number
    successMessage?: StringNullableFilter<"Ticket"> | string | null
    failureMessage?: StringNullableFilter<"Ticket"> | string | null
    assignedToId?: IntFilter<"Ticket"> | number
    lastSentById?: IntNullableFilter<"Ticket"> | number | null
    attackSourcePlayerId?: IntNullableFilter<"Ticket"> | number | null
    pvpAttackId?: IntNullableFilter<"Ticket"> | number | null
    bounceCount?: IntFilter<"Ticket"> | number
    abandonmentPenaltyApplied?: BoolFilter<"Ticket"> | boolean
    abandonmentPenaltyAt?: DateTimeNullableFilter<"Ticket"> | Date | string | null
    resolvedAt?: DateTimeNullableFilter<"Ticket"> | Date | string | null
    expiredAt?: DateTimeNullableFilter<"Ticket"> | Date | string | null
    createdAt?: DateTimeFilter<"Ticket"> | Date | string
    updatedAt?: DateTimeFilter<"Ticket"> | Date | string
  }

  export type TicketUpsertWithWhereUniqueWithoutAssignedToInput = {
    where: TicketWhereUniqueInput
    update: XOR<TicketUpdateWithoutAssignedToInput, TicketUncheckedUpdateWithoutAssignedToInput>
    create: XOR<TicketCreateWithoutAssignedToInput, TicketUncheckedCreateWithoutAssignedToInput>
  }

  export type TicketUpdateWithWhereUniqueWithoutAssignedToInput = {
    where: TicketWhereUniqueInput
    data: XOR<TicketUpdateWithoutAssignedToInput, TicketUncheckedUpdateWithoutAssignedToInput>
  }

  export type TicketUpdateManyWithWhereWithoutAssignedToInput = {
    where: TicketScalarWhereInput
    data: XOR<TicketUpdateManyMutationInput, TicketUncheckedUpdateManyWithoutAssignedToInput>
  }

  export type TicketUpsertWithWhereUniqueWithoutLastSentByInput = {
    where: TicketWhereUniqueInput
    update: XOR<TicketUpdateWithoutLastSentByInput, TicketUncheckedUpdateWithoutLastSentByInput>
    create: XOR<TicketCreateWithoutLastSentByInput, TicketUncheckedCreateWithoutLastSentByInput>
  }

  export type TicketUpdateWithWhereUniqueWithoutLastSentByInput = {
    where: TicketWhereUniqueInput
    data: XOR<TicketUpdateWithoutLastSentByInput, TicketUncheckedUpdateWithoutLastSentByInput>
  }

  export type TicketUpdateManyWithWhereWithoutLastSentByInput = {
    where: TicketScalarWhereInput
    data: XOR<TicketUpdateManyMutationInput, TicketUncheckedUpdateManyWithoutLastSentByInput>
  }

  export type PlayerCreateWithoutAssignedTicketsInput = {
    username: string
    level?: number
    xp?: number
    careerPath?: $Enums.CareerPath | null
    credits?: number
    kills?: number
    bankruptcies?: number
    ticketsResolved?: number
    correctBounces?: number
    incorrectBounces?: number
    incorrectResolves?: number
    lifetimeCreditsEarned?: number
    lifetimeTicketsHandled?: number
    lastActiveAt?: Date | string
    queuePenaltyUntil?: Date | string | null
    nextTicketAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPlayerInput
    attacksSent?: PvPAttackCreateNestedManyWithoutAttackerInput
    attacksReceived?: PvPAttackCreateNestedManyWithoutTargetInput
    attackTickets?: TicketCreateNestedManyWithoutAttackSourcePlayerInput
    sentTickets?: TicketCreateNestedManyWithoutLastSentByInput
  }

  export type PlayerUncheckedCreateWithoutAssignedTicketsInput = {
    id?: number
    userId: string
    username: string
    level?: number
    xp?: number
    careerPath?: $Enums.CareerPath | null
    credits?: number
    kills?: number
    bankruptcies?: number
    ticketsResolved?: number
    correctBounces?: number
    incorrectBounces?: number
    incorrectResolves?: number
    lifetimeCreditsEarned?: number
    lifetimeTicketsHandled?: number
    lastActiveAt?: Date | string
    queuePenaltyUntil?: Date | string | null
    nextTicketAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attacksSent?: PvPAttackUncheckedCreateNestedManyWithoutAttackerInput
    attacksReceived?: PvPAttackUncheckedCreateNestedManyWithoutTargetInput
    attackTickets?: TicketUncheckedCreateNestedManyWithoutAttackSourcePlayerInput
    sentTickets?: TicketUncheckedCreateNestedManyWithoutLastSentByInput
  }

  export type PlayerCreateOrConnectWithoutAssignedTicketsInput = {
    where: PlayerWhereUniqueInput
    create: XOR<PlayerCreateWithoutAssignedTicketsInput, PlayerUncheckedCreateWithoutAssignedTicketsInput>
  }

  export type PlayerCreateWithoutSentTicketsInput = {
    username: string
    level?: number
    xp?: number
    careerPath?: $Enums.CareerPath | null
    credits?: number
    kills?: number
    bankruptcies?: number
    ticketsResolved?: number
    correctBounces?: number
    incorrectBounces?: number
    incorrectResolves?: number
    lifetimeCreditsEarned?: number
    lifetimeTicketsHandled?: number
    lastActiveAt?: Date | string
    queuePenaltyUntil?: Date | string | null
    nextTicketAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPlayerInput
    attacksSent?: PvPAttackCreateNestedManyWithoutAttackerInput
    attacksReceived?: PvPAttackCreateNestedManyWithoutTargetInput
    attackTickets?: TicketCreateNestedManyWithoutAttackSourcePlayerInput
    assignedTickets?: TicketCreateNestedManyWithoutAssignedToInput
  }

  export type PlayerUncheckedCreateWithoutSentTicketsInput = {
    id?: number
    userId: string
    username: string
    level?: number
    xp?: number
    careerPath?: $Enums.CareerPath | null
    credits?: number
    kills?: number
    bankruptcies?: number
    ticketsResolved?: number
    correctBounces?: number
    incorrectBounces?: number
    incorrectResolves?: number
    lifetimeCreditsEarned?: number
    lifetimeTicketsHandled?: number
    lastActiveAt?: Date | string
    queuePenaltyUntil?: Date | string | null
    nextTicketAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attacksSent?: PvPAttackUncheckedCreateNestedManyWithoutAttackerInput
    attacksReceived?: PvPAttackUncheckedCreateNestedManyWithoutTargetInput
    attackTickets?: TicketUncheckedCreateNestedManyWithoutAttackSourcePlayerInput
    assignedTickets?: TicketUncheckedCreateNestedManyWithoutAssignedToInput
  }

  export type PlayerCreateOrConnectWithoutSentTicketsInput = {
    where: PlayerWhereUniqueInput
    create: XOR<PlayerCreateWithoutSentTicketsInput, PlayerUncheckedCreateWithoutSentTicketsInput>
  }

  export type PlayerCreateWithoutAttackTicketsInput = {
    username: string
    level?: number
    xp?: number
    careerPath?: $Enums.CareerPath | null
    credits?: number
    kills?: number
    bankruptcies?: number
    ticketsResolved?: number
    correctBounces?: number
    incorrectBounces?: number
    incorrectResolves?: number
    lifetimeCreditsEarned?: number
    lifetimeTicketsHandled?: number
    lastActiveAt?: Date | string
    queuePenaltyUntil?: Date | string | null
    nextTicketAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPlayerInput
    attacksSent?: PvPAttackCreateNestedManyWithoutAttackerInput
    attacksReceived?: PvPAttackCreateNestedManyWithoutTargetInput
    assignedTickets?: TicketCreateNestedManyWithoutAssignedToInput
    sentTickets?: TicketCreateNestedManyWithoutLastSentByInput
  }

  export type PlayerUncheckedCreateWithoutAttackTicketsInput = {
    id?: number
    userId: string
    username: string
    level?: number
    xp?: number
    careerPath?: $Enums.CareerPath | null
    credits?: number
    kills?: number
    bankruptcies?: number
    ticketsResolved?: number
    correctBounces?: number
    incorrectBounces?: number
    incorrectResolves?: number
    lifetimeCreditsEarned?: number
    lifetimeTicketsHandled?: number
    lastActiveAt?: Date | string
    queuePenaltyUntil?: Date | string | null
    nextTicketAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attacksSent?: PvPAttackUncheckedCreateNestedManyWithoutAttackerInput
    attacksReceived?: PvPAttackUncheckedCreateNestedManyWithoutTargetInput
    assignedTickets?: TicketUncheckedCreateNestedManyWithoutAssignedToInput
    sentTickets?: TicketUncheckedCreateNestedManyWithoutLastSentByInput
  }

  export type PlayerCreateOrConnectWithoutAttackTicketsInput = {
    where: PlayerWhereUniqueInput
    create: XOR<PlayerCreateWithoutAttackTicketsInput, PlayerUncheckedCreateWithoutAttackTicketsInput>
  }

  export type PvPAttackCreateWithoutTicketsInput = {
    type: $Enums.PvPAttackType
    status?: $Enums.PvPAttackStatus
    cost: number
    causedBankruptcy?: boolean
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attacker: PlayerCreateNestedOneWithoutAttacksSentInput
    target: PlayerCreateNestedOneWithoutAttacksReceivedInput
  }

  export type PvPAttackUncheckedCreateWithoutTicketsInput = {
    id?: number
    type: $Enums.PvPAttackType
    status?: $Enums.PvPAttackStatus
    cost: number
    attackerId: number
    targetId: number
    causedBankruptcy?: boolean
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PvPAttackCreateOrConnectWithoutTicketsInput = {
    where: PvPAttackWhereUniqueInput
    create: XOR<PvPAttackCreateWithoutTicketsInput, PvPAttackUncheckedCreateWithoutTicketsInput>
  }

  export type PlayerUpsertWithoutAssignedTicketsInput = {
    update: XOR<PlayerUpdateWithoutAssignedTicketsInput, PlayerUncheckedUpdateWithoutAssignedTicketsInput>
    create: XOR<PlayerCreateWithoutAssignedTicketsInput, PlayerUncheckedCreateWithoutAssignedTicketsInput>
    where?: PlayerWhereInput
  }

  export type PlayerUpdateToOneWithWhereWithoutAssignedTicketsInput = {
    where?: PlayerWhereInput
    data: XOR<PlayerUpdateWithoutAssignedTicketsInput, PlayerUncheckedUpdateWithoutAssignedTicketsInput>
  }

  export type PlayerUpdateWithoutAssignedTicketsInput = {
    username?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    xp?: IntFieldUpdateOperationsInput | number
    careerPath?: NullableEnumCareerPathFieldUpdateOperationsInput | $Enums.CareerPath | null
    credits?: IntFieldUpdateOperationsInput | number
    kills?: IntFieldUpdateOperationsInput | number
    bankruptcies?: IntFieldUpdateOperationsInput | number
    ticketsResolved?: IntFieldUpdateOperationsInput | number
    correctBounces?: IntFieldUpdateOperationsInput | number
    incorrectBounces?: IntFieldUpdateOperationsInput | number
    incorrectResolves?: IntFieldUpdateOperationsInput | number
    lifetimeCreditsEarned?: IntFieldUpdateOperationsInput | number
    lifetimeTicketsHandled?: IntFieldUpdateOperationsInput | number
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    queuePenaltyUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextTicketAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPlayerNestedInput
    attacksSent?: PvPAttackUpdateManyWithoutAttackerNestedInput
    attacksReceived?: PvPAttackUpdateManyWithoutTargetNestedInput
    attackTickets?: TicketUpdateManyWithoutAttackSourcePlayerNestedInput
    sentTickets?: TicketUpdateManyWithoutLastSentByNestedInput
  }

  export type PlayerUncheckedUpdateWithoutAssignedTicketsInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    xp?: IntFieldUpdateOperationsInput | number
    careerPath?: NullableEnumCareerPathFieldUpdateOperationsInput | $Enums.CareerPath | null
    credits?: IntFieldUpdateOperationsInput | number
    kills?: IntFieldUpdateOperationsInput | number
    bankruptcies?: IntFieldUpdateOperationsInput | number
    ticketsResolved?: IntFieldUpdateOperationsInput | number
    correctBounces?: IntFieldUpdateOperationsInput | number
    incorrectBounces?: IntFieldUpdateOperationsInput | number
    incorrectResolves?: IntFieldUpdateOperationsInput | number
    lifetimeCreditsEarned?: IntFieldUpdateOperationsInput | number
    lifetimeTicketsHandled?: IntFieldUpdateOperationsInput | number
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    queuePenaltyUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextTicketAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attacksSent?: PvPAttackUncheckedUpdateManyWithoutAttackerNestedInput
    attacksReceived?: PvPAttackUncheckedUpdateManyWithoutTargetNestedInput
    attackTickets?: TicketUncheckedUpdateManyWithoutAttackSourcePlayerNestedInput
    sentTickets?: TicketUncheckedUpdateManyWithoutLastSentByNestedInput
  }

  export type PlayerUpsertWithoutSentTicketsInput = {
    update: XOR<PlayerUpdateWithoutSentTicketsInput, PlayerUncheckedUpdateWithoutSentTicketsInput>
    create: XOR<PlayerCreateWithoutSentTicketsInput, PlayerUncheckedCreateWithoutSentTicketsInput>
    where?: PlayerWhereInput
  }

  export type PlayerUpdateToOneWithWhereWithoutSentTicketsInput = {
    where?: PlayerWhereInput
    data: XOR<PlayerUpdateWithoutSentTicketsInput, PlayerUncheckedUpdateWithoutSentTicketsInput>
  }

  export type PlayerUpdateWithoutSentTicketsInput = {
    username?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    xp?: IntFieldUpdateOperationsInput | number
    careerPath?: NullableEnumCareerPathFieldUpdateOperationsInput | $Enums.CareerPath | null
    credits?: IntFieldUpdateOperationsInput | number
    kills?: IntFieldUpdateOperationsInput | number
    bankruptcies?: IntFieldUpdateOperationsInput | number
    ticketsResolved?: IntFieldUpdateOperationsInput | number
    correctBounces?: IntFieldUpdateOperationsInput | number
    incorrectBounces?: IntFieldUpdateOperationsInput | number
    incorrectResolves?: IntFieldUpdateOperationsInput | number
    lifetimeCreditsEarned?: IntFieldUpdateOperationsInput | number
    lifetimeTicketsHandled?: IntFieldUpdateOperationsInput | number
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    queuePenaltyUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextTicketAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPlayerNestedInput
    attacksSent?: PvPAttackUpdateManyWithoutAttackerNestedInput
    attacksReceived?: PvPAttackUpdateManyWithoutTargetNestedInput
    attackTickets?: TicketUpdateManyWithoutAttackSourcePlayerNestedInput
    assignedTickets?: TicketUpdateManyWithoutAssignedToNestedInput
  }

  export type PlayerUncheckedUpdateWithoutSentTicketsInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    xp?: IntFieldUpdateOperationsInput | number
    careerPath?: NullableEnumCareerPathFieldUpdateOperationsInput | $Enums.CareerPath | null
    credits?: IntFieldUpdateOperationsInput | number
    kills?: IntFieldUpdateOperationsInput | number
    bankruptcies?: IntFieldUpdateOperationsInput | number
    ticketsResolved?: IntFieldUpdateOperationsInput | number
    correctBounces?: IntFieldUpdateOperationsInput | number
    incorrectBounces?: IntFieldUpdateOperationsInput | number
    incorrectResolves?: IntFieldUpdateOperationsInput | number
    lifetimeCreditsEarned?: IntFieldUpdateOperationsInput | number
    lifetimeTicketsHandled?: IntFieldUpdateOperationsInput | number
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    queuePenaltyUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextTicketAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attacksSent?: PvPAttackUncheckedUpdateManyWithoutAttackerNestedInput
    attacksReceived?: PvPAttackUncheckedUpdateManyWithoutTargetNestedInput
    attackTickets?: TicketUncheckedUpdateManyWithoutAttackSourcePlayerNestedInput
    assignedTickets?: TicketUncheckedUpdateManyWithoutAssignedToNestedInput
  }

  export type PlayerUpsertWithoutAttackTicketsInput = {
    update: XOR<PlayerUpdateWithoutAttackTicketsInput, PlayerUncheckedUpdateWithoutAttackTicketsInput>
    create: XOR<PlayerCreateWithoutAttackTicketsInput, PlayerUncheckedCreateWithoutAttackTicketsInput>
    where?: PlayerWhereInput
  }

  export type PlayerUpdateToOneWithWhereWithoutAttackTicketsInput = {
    where?: PlayerWhereInput
    data: XOR<PlayerUpdateWithoutAttackTicketsInput, PlayerUncheckedUpdateWithoutAttackTicketsInput>
  }

  export type PlayerUpdateWithoutAttackTicketsInput = {
    username?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    xp?: IntFieldUpdateOperationsInput | number
    careerPath?: NullableEnumCareerPathFieldUpdateOperationsInput | $Enums.CareerPath | null
    credits?: IntFieldUpdateOperationsInput | number
    kills?: IntFieldUpdateOperationsInput | number
    bankruptcies?: IntFieldUpdateOperationsInput | number
    ticketsResolved?: IntFieldUpdateOperationsInput | number
    correctBounces?: IntFieldUpdateOperationsInput | number
    incorrectBounces?: IntFieldUpdateOperationsInput | number
    incorrectResolves?: IntFieldUpdateOperationsInput | number
    lifetimeCreditsEarned?: IntFieldUpdateOperationsInput | number
    lifetimeTicketsHandled?: IntFieldUpdateOperationsInput | number
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    queuePenaltyUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextTicketAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPlayerNestedInput
    attacksSent?: PvPAttackUpdateManyWithoutAttackerNestedInput
    attacksReceived?: PvPAttackUpdateManyWithoutTargetNestedInput
    assignedTickets?: TicketUpdateManyWithoutAssignedToNestedInput
    sentTickets?: TicketUpdateManyWithoutLastSentByNestedInput
  }

  export type PlayerUncheckedUpdateWithoutAttackTicketsInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    xp?: IntFieldUpdateOperationsInput | number
    careerPath?: NullableEnumCareerPathFieldUpdateOperationsInput | $Enums.CareerPath | null
    credits?: IntFieldUpdateOperationsInput | number
    kills?: IntFieldUpdateOperationsInput | number
    bankruptcies?: IntFieldUpdateOperationsInput | number
    ticketsResolved?: IntFieldUpdateOperationsInput | number
    correctBounces?: IntFieldUpdateOperationsInput | number
    incorrectBounces?: IntFieldUpdateOperationsInput | number
    incorrectResolves?: IntFieldUpdateOperationsInput | number
    lifetimeCreditsEarned?: IntFieldUpdateOperationsInput | number
    lifetimeTicketsHandled?: IntFieldUpdateOperationsInput | number
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    queuePenaltyUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextTicketAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attacksSent?: PvPAttackUncheckedUpdateManyWithoutAttackerNestedInput
    attacksReceived?: PvPAttackUncheckedUpdateManyWithoutTargetNestedInput
    assignedTickets?: TicketUncheckedUpdateManyWithoutAssignedToNestedInput
    sentTickets?: TicketUncheckedUpdateManyWithoutLastSentByNestedInput
  }

  export type PvPAttackUpsertWithoutTicketsInput = {
    update: XOR<PvPAttackUpdateWithoutTicketsInput, PvPAttackUncheckedUpdateWithoutTicketsInput>
    create: XOR<PvPAttackCreateWithoutTicketsInput, PvPAttackUncheckedCreateWithoutTicketsInput>
    where?: PvPAttackWhereInput
  }

  export type PvPAttackUpdateToOneWithWhereWithoutTicketsInput = {
    where?: PvPAttackWhereInput
    data: XOR<PvPAttackUpdateWithoutTicketsInput, PvPAttackUncheckedUpdateWithoutTicketsInput>
  }

  export type PvPAttackUpdateWithoutTicketsInput = {
    type?: EnumPvPAttackTypeFieldUpdateOperationsInput | $Enums.PvPAttackType
    status?: EnumPvPAttackStatusFieldUpdateOperationsInput | $Enums.PvPAttackStatus
    cost?: IntFieldUpdateOperationsInput | number
    causedBankruptcy?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attacker?: PlayerUpdateOneRequiredWithoutAttacksSentNestedInput
    target?: PlayerUpdateOneRequiredWithoutAttacksReceivedNestedInput
  }

  export type PvPAttackUncheckedUpdateWithoutTicketsInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: EnumPvPAttackTypeFieldUpdateOperationsInput | $Enums.PvPAttackType
    status?: EnumPvPAttackStatusFieldUpdateOperationsInput | $Enums.PvPAttackStatus
    cost?: IntFieldUpdateOperationsInput | number
    attackerId?: IntFieldUpdateOperationsInput | number
    targetId?: IntFieldUpdateOperationsInput | number
    causedBankruptcy?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlayerCreateWithoutAttacksSentInput = {
    username: string
    level?: number
    xp?: number
    careerPath?: $Enums.CareerPath | null
    credits?: number
    kills?: number
    bankruptcies?: number
    ticketsResolved?: number
    correctBounces?: number
    incorrectBounces?: number
    incorrectResolves?: number
    lifetimeCreditsEarned?: number
    lifetimeTicketsHandled?: number
    lastActiveAt?: Date | string
    queuePenaltyUntil?: Date | string | null
    nextTicketAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPlayerInput
    attacksReceived?: PvPAttackCreateNestedManyWithoutTargetInput
    attackTickets?: TicketCreateNestedManyWithoutAttackSourcePlayerInput
    assignedTickets?: TicketCreateNestedManyWithoutAssignedToInput
    sentTickets?: TicketCreateNestedManyWithoutLastSentByInput
  }

  export type PlayerUncheckedCreateWithoutAttacksSentInput = {
    id?: number
    userId: string
    username: string
    level?: number
    xp?: number
    careerPath?: $Enums.CareerPath | null
    credits?: number
    kills?: number
    bankruptcies?: number
    ticketsResolved?: number
    correctBounces?: number
    incorrectBounces?: number
    incorrectResolves?: number
    lifetimeCreditsEarned?: number
    lifetimeTicketsHandled?: number
    lastActiveAt?: Date | string
    queuePenaltyUntil?: Date | string | null
    nextTicketAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attacksReceived?: PvPAttackUncheckedCreateNestedManyWithoutTargetInput
    attackTickets?: TicketUncheckedCreateNestedManyWithoutAttackSourcePlayerInput
    assignedTickets?: TicketUncheckedCreateNestedManyWithoutAssignedToInput
    sentTickets?: TicketUncheckedCreateNestedManyWithoutLastSentByInput
  }

  export type PlayerCreateOrConnectWithoutAttacksSentInput = {
    where: PlayerWhereUniqueInput
    create: XOR<PlayerCreateWithoutAttacksSentInput, PlayerUncheckedCreateWithoutAttacksSentInput>
  }

  export type PlayerCreateWithoutAttacksReceivedInput = {
    username: string
    level?: number
    xp?: number
    careerPath?: $Enums.CareerPath | null
    credits?: number
    kills?: number
    bankruptcies?: number
    ticketsResolved?: number
    correctBounces?: number
    incorrectBounces?: number
    incorrectResolves?: number
    lifetimeCreditsEarned?: number
    lifetimeTicketsHandled?: number
    lastActiveAt?: Date | string
    queuePenaltyUntil?: Date | string | null
    nextTicketAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPlayerInput
    attacksSent?: PvPAttackCreateNestedManyWithoutAttackerInput
    attackTickets?: TicketCreateNestedManyWithoutAttackSourcePlayerInput
    assignedTickets?: TicketCreateNestedManyWithoutAssignedToInput
    sentTickets?: TicketCreateNestedManyWithoutLastSentByInput
  }

  export type PlayerUncheckedCreateWithoutAttacksReceivedInput = {
    id?: number
    userId: string
    username: string
    level?: number
    xp?: number
    careerPath?: $Enums.CareerPath | null
    credits?: number
    kills?: number
    bankruptcies?: number
    ticketsResolved?: number
    correctBounces?: number
    incorrectBounces?: number
    incorrectResolves?: number
    lifetimeCreditsEarned?: number
    lifetimeTicketsHandled?: number
    lastActiveAt?: Date | string
    queuePenaltyUntil?: Date | string | null
    nextTicketAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attacksSent?: PvPAttackUncheckedCreateNestedManyWithoutAttackerInput
    attackTickets?: TicketUncheckedCreateNestedManyWithoutAttackSourcePlayerInput
    assignedTickets?: TicketUncheckedCreateNestedManyWithoutAssignedToInput
    sentTickets?: TicketUncheckedCreateNestedManyWithoutLastSentByInput
  }

  export type PlayerCreateOrConnectWithoutAttacksReceivedInput = {
    where: PlayerWhereUniqueInput
    create: XOR<PlayerCreateWithoutAttacksReceivedInput, PlayerUncheckedCreateWithoutAttacksReceivedInput>
  }

  export type TicketCreateWithoutPvpAttackInput = {
    title: string
    description: string
    category: $Enums.TicketCategory
    severity?: $Enums.TicketSeverity
    difficulty?: number
    status?: $Enums.TicketStatus
    maxValue: number
    baseXp?: number
    successMessage?: string | null
    failureMessage?: string | null
    bounceCount?: number
    abandonmentPenaltyApplied?: boolean
    abandonmentPenaltyAt?: Date | string | null
    resolvedAt?: Date | string | null
    expiredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assignedTo: PlayerCreateNestedOneWithoutAssignedTicketsInput
    lastSentBy?: PlayerCreateNestedOneWithoutSentTicketsInput
    attackSourcePlayer?: PlayerCreateNestedOneWithoutAttackTicketsInput
  }

  export type TicketUncheckedCreateWithoutPvpAttackInput = {
    id?: number
    title: string
    description: string
    category: $Enums.TicketCategory
    severity?: $Enums.TicketSeverity
    difficulty?: number
    status?: $Enums.TicketStatus
    maxValue: number
    baseXp?: number
    successMessage?: string | null
    failureMessage?: string | null
    assignedToId: number
    lastSentById?: number | null
    attackSourcePlayerId?: number | null
    bounceCount?: number
    abandonmentPenaltyApplied?: boolean
    abandonmentPenaltyAt?: Date | string | null
    resolvedAt?: Date | string | null
    expiredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TicketCreateOrConnectWithoutPvpAttackInput = {
    where: TicketWhereUniqueInput
    create: XOR<TicketCreateWithoutPvpAttackInput, TicketUncheckedCreateWithoutPvpAttackInput>
  }

  export type TicketCreateManyPvpAttackInputEnvelope = {
    data: TicketCreateManyPvpAttackInput | TicketCreateManyPvpAttackInput[]
    skipDuplicates?: boolean
  }

  export type PlayerUpsertWithoutAttacksSentInput = {
    update: XOR<PlayerUpdateWithoutAttacksSentInput, PlayerUncheckedUpdateWithoutAttacksSentInput>
    create: XOR<PlayerCreateWithoutAttacksSentInput, PlayerUncheckedCreateWithoutAttacksSentInput>
    where?: PlayerWhereInput
  }

  export type PlayerUpdateToOneWithWhereWithoutAttacksSentInput = {
    where?: PlayerWhereInput
    data: XOR<PlayerUpdateWithoutAttacksSentInput, PlayerUncheckedUpdateWithoutAttacksSentInput>
  }

  export type PlayerUpdateWithoutAttacksSentInput = {
    username?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    xp?: IntFieldUpdateOperationsInput | number
    careerPath?: NullableEnumCareerPathFieldUpdateOperationsInput | $Enums.CareerPath | null
    credits?: IntFieldUpdateOperationsInput | number
    kills?: IntFieldUpdateOperationsInput | number
    bankruptcies?: IntFieldUpdateOperationsInput | number
    ticketsResolved?: IntFieldUpdateOperationsInput | number
    correctBounces?: IntFieldUpdateOperationsInput | number
    incorrectBounces?: IntFieldUpdateOperationsInput | number
    incorrectResolves?: IntFieldUpdateOperationsInput | number
    lifetimeCreditsEarned?: IntFieldUpdateOperationsInput | number
    lifetimeTicketsHandled?: IntFieldUpdateOperationsInput | number
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    queuePenaltyUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextTicketAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPlayerNestedInput
    attacksReceived?: PvPAttackUpdateManyWithoutTargetNestedInput
    attackTickets?: TicketUpdateManyWithoutAttackSourcePlayerNestedInput
    assignedTickets?: TicketUpdateManyWithoutAssignedToNestedInput
    sentTickets?: TicketUpdateManyWithoutLastSentByNestedInput
  }

  export type PlayerUncheckedUpdateWithoutAttacksSentInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    xp?: IntFieldUpdateOperationsInput | number
    careerPath?: NullableEnumCareerPathFieldUpdateOperationsInput | $Enums.CareerPath | null
    credits?: IntFieldUpdateOperationsInput | number
    kills?: IntFieldUpdateOperationsInput | number
    bankruptcies?: IntFieldUpdateOperationsInput | number
    ticketsResolved?: IntFieldUpdateOperationsInput | number
    correctBounces?: IntFieldUpdateOperationsInput | number
    incorrectBounces?: IntFieldUpdateOperationsInput | number
    incorrectResolves?: IntFieldUpdateOperationsInput | number
    lifetimeCreditsEarned?: IntFieldUpdateOperationsInput | number
    lifetimeTicketsHandled?: IntFieldUpdateOperationsInput | number
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    queuePenaltyUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextTicketAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attacksReceived?: PvPAttackUncheckedUpdateManyWithoutTargetNestedInput
    attackTickets?: TicketUncheckedUpdateManyWithoutAttackSourcePlayerNestedInput
    assignedTickets?: TicketUncheckedUpdateManyWithoutAssignedToNestedInput
    sentTickets?: TicketUncheckedUpdateManyWithoutLastSentByNestedInput
  }

  export type PlayerUpsertWithoutAttacksReceivedInput = {
    update: XOR<PlayerUpdateWithoutAttacksReceivedInput, PlayerUncheckedUpdateWithoutAttacksReceivedInput>
    create: XOR<PlayerCreateWithoutAttacksReceivedInput, PlayerUncheckedCreateWithoutAttacksReceivedInput>
    where?: PlayerWhereInput
  }

  export type PlayerUpdateToOneWithWhereWithoutAttacksReceivedInput = {
    where?: PlayerWhereInput
    data: XOR<PlayerUpdateWithoutAttacksReceivedInput, PlayerUncheckedUpdateWithoutAttacksReceivedInput>
  }

  export type PlayerUpdateWithoutAttacksReceivedInput = {
    username?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    xp?: IntFieldUpdateOperationsInput | number
    careerPath?: NullableEnumCareerPathFieldUpdateOperationsInput | $Enums.CareerPath | null
    credits?: IntFieldUpdateOperationsInput | number
    kills?: IntFieldUpdateOperationsInput | number
    bankruptcies?: IntFieldUpdateOperationsInput | number
    ticketsResolved?: IntFieldUpdateOperationsInput | number
    correctBounces?: IntFieldUpdateOperationsInput | number
    incorrectBounces?: IntFieldUpdateOperationsInput | number
    incorrectResolves?: IntFieldUpdateOperationsInput | number
    lifetimeCreditsEarned?: IntFieldUpdateOperationsInput | number
    lifetimeTicketsHandled?: IntFieldUpdateOperationsInput | number
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    queuePenaltyUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextTicketAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPlayerNestedInput
    attacksSent?: PvPAttackUpdateManyWithoutAttackerNestedInput
    attackTickets?: TicketUpdateManyWithoutAttackSourcePlayerNestedInput
    assignedTickets?: TicketUpdateManyWithoutAssignedToNestedInput
    sentTickets?: TicketUpdateManyWithoutLastSentByNestedInput
  }

  export type PlayerUncheckedUpdateWithoutAttacksReceivedInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    xp?: IntFieldUpdateOperationsInput | number
    careerPath?: NullableEnumCareerPathFieldUpdateOperationsInput | $Enums.CareerPath | null
    credits?: IntFieldUpdateOperationsInput | number
    kills?: IntFieldUpdateOperationsInput | number
    bankruptcies?: IntFieldUpdateOperationsInput | number
    ticketsResolved?: IntFieldUpdateOperationsInput | number
    correctBounces?: IntFieldUpdateOperationsInput | number
    incorrectBounces?: IntFieldUpdateOperationsInput | number
    incorrectResolves?: IntFieldUpdateOperationsInput | number
    lifetimeCreditsEarned?: IntFieldUpdateOperationsInput | number
    lifetimeTicketsHandled?: IntFieldUpdateOperationsInput | number
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    queuePenaltyUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextTicketAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attacksSent?: PvPAttackUncheckedUpdateManyWithoutAttackerNestedInput
    attackTickets?: TicketUncheckedUpdateManyWithoutAttackSourcePlayerNestedInput
    assignedTickets?: TicketUncheckedUpdateManyWithoutAssignedToNestedInput
    sentTickets?: TicketUncheckedUpdateManyWithoutLastSentByNestedInput
  }

  export type TicketUpsertWithWhereUniqueWithoutPvpAttackInput = {
    where: TicketWhereUniqueInput
    update: XOR<TicketUpdateWithoutPvpAttackInput, TicketUncheckedUpdateWithoutPvpAttackInput>
    create: XOR<TicketCreateWithoutPvpAttackInput, TicketUncheckedCreateWithoutPvpAttackInput>
  }

  export type TicketUpdateWithWhereUniqueWithoutPvpAttackInput = {
    where: TicketWhereUniqueInput
    data: XOR<TicketUpdateWithoutPvpAttackInput, TicketUncheckedUpdateWithoutPvpAttackInput>
  }

  export type TicketUpdateManyWithWhereWithoutPvpAttackInput = {
    where: TicketScalarWhereInput
    data: XOR<TicketUpdateManyMutationInput, TicketUncheckedUpdateManyWithoutPvpAttackInput>
  }

  export type SessionCreateWithoutUserInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AccountCreateWithoutUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PlayerCreateWithoutUserInput = {
    username: string
    level?: number
    xp?: number
    careerPath?: $Enums.CareerPath | null
    credits?: number
    kills?: number
    bankruptcies?: number
    ticketsResolved?: number
    correctBounces?: number
    incorrectBounces?: number
    incorrectResolves?: number
    lifetimeCreditsEarned?: number
    lifetimeTicketsHandled?: number
    lastActiveAt?: Date | string
    queuePenaltyUntil?: Date | string | null
    nextTicketAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attacksSent?: PvPAttackCreateNestedManyWithoutAttackerInput
    attacksReceived?: PvPAttackCreateNestedManyWithoutTargetInput
    attackTickets?: TicketCreateNestedManyWithoutAttackSourcePlayerInput
    assignedTickets?: TicketCreateNestedManyWithoutAssignedToInput
    sentTickets?: TicketCreateNestedManyWithoutLastSentByInput
  }

  export type PlayerUncheckedCreateWithoutUserInput = {
    id?: number
    username: string
    level?: number
    xp?: number
    careerPath?: $Enums.CareerPath | null
    credits?: number
    kills?: number
    bankruptcies?: number
    ticketsResolved?: number
    correctBounces?: number
    incorrectBounces?: number
    incorrectResolves?: number
    lifetimeCreditsEarned?: number
    lifetimeTicketsHandled?: number
    lastActiveAt?: Date | string
    queuePenaltyUntil?: Date | string | null
    nextTicketAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    attacksSent?: PvPAttackUncheckedCreateNestedManyWithoutAttackerInput
    attacksReceived?: PvPAttackUncheckedCreateNestedManyWithoutTargetInput
    attackTickets?: TicketUncheckedCreateNestedManyWithoutAttackSourcePlayerInput
    assignedTickets?: TicketUncheckedCreateNestedManyWithoutAssignedToInput
    sentTickets?: TicketUncheckedCreateNestedManyWithoutLastSentByInput
  }

  export type PlayerCreateOrConnectWithoutUserInput = {
    where: PlayerWhereUniqueInput
    create: XOR<PlayerCreateWithoutUserInput, PlayerUncheckedCreateWithoutUserInput>
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    token?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
  }

  export type PlayerUpsertWithoutUserInput = {
    update: XOR<PlayerUpdateWithoutUserInput, PlayerUncheckedUpdateWithoutUserInput>
    create: XOR<PlayerCreateWithoutUserInput, PlayerUncheckedCreateWithoutUserInput>
    where?: PlayerWhereInput
  }

  export type PlayerUpdateToOneWithWhereWithoutUserInput = {
    where?: PlayerWhereInput
    data: XOR<PlayerUpdateWithoutUserInput, PlayerUncheckedUpdateWithoutUserInput>
  }

  export type PlayerUpdateWithoutUserInput = {
    username?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    xp?: IntFieldUpdateOperationsInput | number
    careerPath?: NullableEnumCareerPathFieldUpdateOperationsInput | $Enums.CareerPath | null
    credits?: IntFieldUpdateOperationsInput | number
    kills?: IntFieldUpdateOperationsInput | number
    bankruptcies?: IntFieldUpdateOperationsInput | number
    ticketsResolved?: IntFieldUpdateOperationsInput | number
    correctBounces?: IntFieldUpdateOperationsInput | number
    incorrectBounces?: IntFieldUpdateOperationsInput | number
    incorrectResolves?: IntFieldUpdateOperationsInput | number
    lifetimeCreditsEarned?: IntFieldUpdateOperationsInput | number
    lifetimeTicketsHandled?: IntFieldUpdateOperationsInput | number
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    queuePenaltyUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextTicketAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attacksSent?: PvPAttackUpdateManyWithoutAttackerNestedInput
    attacksReceived?: PvPAttackUpdateManyWithoutTargetNestedInput
    attackTickets?: TicketUpdateManyWithoutAttackSourcePlayerNestedInput
    assignedTickets?: TicketUpdateManyWithoutAssignedToNestedInput
    sentTickets?: TicketUpdateManyWithoutLastSentByNestedInput
  }

  export type PlayerUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    level?: IntFieldUpdateOperationsInput | number
    xp?: IntFieldUpdateOperationsInput | number
    careerPath?: NullableEnumCareerPathFieldUpdateOperationsInput | $Enums.CareerPath | null
    credits?: IntFieldUpdateOperationsInput | number
    kills?: IntFieldUpdateOperationsInput | number
    bankruptcies?: IntFieldUpdateOperationsInput | number
    ticketsResolved?: IntFieldUpdateOperationsInput | number
    correctBounces?: IntFieldUpdateOperationsInput | number
    incorrectBounces?: IntFieldUpdateOperationsInput | number
    incorrectResolves?: IntFieldUpdateOperationsInput | number
    lifetimeCreditsEarned?: IntFieldUpdateOperationsInput | number
    lifetimeTicketsHandled?: IntFieldUpdateOperationsInput | number
    lastActiveAt?: DateTimeFieldUpdateOperationsInput | Date | string
    queuePenaltyUntil?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    nextTicketAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attacksSent?: PvPAttackUncheckedUpdateManyWithoutAttackerNestedInput
    attacksReceived?: PvPAttackUncheckedUpdateManyWithoutTargetNestedInput
    attackTickets?: TicketUncheckedUpdateManyWithoutAttackSourcePlayerNestedInput
    assignedTickets?: TicketUncheckedUpdateManyWithoutAssignedToNestedInput
    sentTickets?: TicketUncheckedUpdateManyWithoutLastSentByNestedInput
  }

  export type UserCreateWithoutSessionsInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountCreateNestedManyWithoutUserInput
    player?: PlayerCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
    player?: PlayerUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUpdateManyWithoutUserNestedInput
    player?: PlayerUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
    player?: PlayerUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateWithoutAccountsInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
    player?: PlayerCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    player?: PlayerUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
    player?: PlayerUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    player?: PlayerUncheckedUpdateOneWithoutUserNestedInput
  }

  export type PvPAttackCreateManyAttackerInput = {
    id?: number
    type: $Enums.PvPAttackType
    status?: $Enums.PvPAttackStatus
    cost: number
    targetId: number
    causedBankruptcy?: boolean
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PvPAttackCreateManyTargetInput = {
    id?: number
    type: $Enums.PvPAttackType
    status?: $Enums.PvPAttackStatus
    cost: number
    attackerId: number
    causedBankruptcy?: boolean
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TicketCreateManyAttackSourcePlayerInput = {
    id?: number
    title: string
    description: string
    category: $Enums.TicketCategory
    severity?: $Enums.TicketSeverity
    difficulty?: number
    status?: $Enums.TicketStatus
    maxValue: number
    baseXp?: number
    successMessage?: string | null
    failureMessage?: string | null
    assignedToId: number
    lastSentById?: number | null
    pvpAttackId?: number | null
    bounceCount?: number
    abandonmentPenaltyApplied?: boolean
    abandonmentPenaltyAt?: Date | string | null
    resolvedAt?: Date | string | null
    expiredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TicketCreateManyAssignedToInput = {
    id?: number
    title: string
    description: string
    category: $Enums.TicketCategory
    severity?: $Enums.TicketSeverity
    difficulty?: number
    status?: $Enums.TicketStatus
    maxValue: number
    baseXp?: number
    successMessage?: string | null
    failureMessage?: string | null
    lastSentById?: number | null
    attackSourcePlayerId?: number | null
    pvpAttackId?: number | null
    bounceCount?: number
    abandonmentPenaltyApplied?: boolean
    abandonmentPenaltyAt?: Date | string | null
    resolvedAt?: Date | string | null
    expiredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TicketCreateManyLastSentByInput = {
    id?: number
    title: string
    description: string
    category: $Enums.TicketCategory
    severity?: $Enums.TicketSeverity
    difficulty?: number
    status?: $Enums.TicketStatus
    maxValue: number
    baseXp?: number
    successMessage?: string | null
    failureMessage?: string | null
    assignedToId: number
    attackSourcePlayerId?: number | null
    pvpAttackId?: number | null
    bounceCount?: number
    abandonmentPenaltyApplied?: boolean
    abandonmentPenaltyAt?: Date | string | null
    resolvedAt?: Date | string | null
    expiredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PvPAttackUpdateWithoutAttackerInput = {
    type?: EnumPvPAttackTypeFieldUpdateOperationsInput | $Enums.PvPAttackType
    status?: EnumPvPAttackStatusFieldUpdateOperationsInput | $Enums.PvPAttackStatus
    cost?: IntFieldUpdateOperationsInput | number
    causedBankruptcy?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    target?: PlayerUpdateOneRequiredWithoutAttacksReceivedNestedInput
    tickets?: TicketUpdateManyWithoutPvpAttackNestedInput
  }

  export type PvPAttackUncheckedUpdateWithoutAttackerInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: EnumPvPAttackTypeFieldUpdateOperationsInput | $Enums.PvPAttackType
    status?: EnumPvPAttackStatusFieldUpdateOperationsInput | $Enums.PvPAttackStatus
    cost?: IntFieldUpdateOperationsInput | number
    targetId?: IntFieldUpdateOperationsInput | number
    causedBankruptcy?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tickets?: TicketUncheckedUpdateManyWithoutPvpAttackNestedInput
  }

  export type PvPAttackUncheckedUpdateManyWithoutAttackerInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: EnumPvPAttackTypeFieldUpdateOperationsInput | $Enums.PvPAttackType
    status?: EnumPvPAttackStatusFieldUpdateOperationsInput | $Enums.PvPAttackStatus
    cost?: IntFieldUpdateOperationsInput | number
    targetId?: IntFieldUpdateOperationsInput | number
    causedBankruptcy?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PvPAttackUpdateWithoutTargetInput = {
    type?: EnumPvPAttackTypeFieldUpdateOperationsInput | $Enums.PvPAttackType
    status?: EnumPvPAttackStatusFieldUpdateOperationsInput | $Enums.PvPAttackStatus
    cost?: IntFieldUpdateOperationsInput | number
    causedBankruptcy?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    attacker?: PlayerUpdateOneRequiredWithoutAttacksSentNestedInput
    tickets?: TicketUpdateManyWithoutPvpAttackNestedInput
  }

  export type PvPAttackUncheckedUpdateWithoutTargetInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: EnumPvPAttackTypeFieldUpdateOperationsInput | $Enums.PvPAttackType
    status?: EnumPvPAttackStatusFieldUpdateOperationsInput | $Enums.PvPAttackStatus
    cost?: IntFieldUpdateOperationsInput | number
    attackerId?: IntFieldUpdateOperationsInput | number
    causedBankruptcy?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tickets?: TicketUncheckedUpdateManyWithoutPvpAttackNestedInput
  }

  export type PvPAttackUncheckedUpdateManyWithoutTargetInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: EnumPvPAttackTypeFieldUpdateOperationsInput | $Enums.PvPAttackType
    status?: EnumPvPAttackStatusFieldUpdateOperationsInput | $Enums.PvPAttackStatus
    cost?: IntFieldUpdateOperationsInput | number
    attackerId?: IntFieldUpdateOperationsInput | number
    causedBankruptcy?: BoolFieldUpdateOperationsInput | boolean
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketUpdateWithoutAttackSourcePlayerInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumTicketCategoryFieldUpdateOperationsInput | $Enums.TicketCategory
    severity?: EnumTicketSeverityFieldUpdateOperationsInput | $Enums.TicketSeverity
    difficulty?: IntFieldUpdateOperationsInput | number
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    maxValue?: IntFieldUpdateOperationsInput | number
    baseXp?: IntFieldUpdateOperationsInput | number
    successMessage?: NullableStringFieldUpdateOperationsInput | string | null
    failureMessage?: NullableStringFieldUpdateOperationsInput | string | null
    bounceCount?: IntFieldUpdateOperationsInput | number
    abandonmentPenaltyApplied?: BoolFieldUpdateOperationsInput | boolean
    abandonmentPenaltyAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedTo?: PlayerUpdateOneRequiredWithoutAssignedTicketsNestedInput
    lastSentBy?: PlayerUpdateOneWithoutSentTicketsNestedInput
    pvpAttack?: PvPAttackUpdateOneWithoutTicketsNestedInput
  }

  export type TicketUncheckedUpdateWithoutAttackSourcePlayerInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumTicketCategoryFieldUpdateOperationsInput | $Enums.TicketCategory
    severity?: EnumTicketSeverityFieldUpdateOperationsInput | $Enums.TicketSeverity
    difficulty?: IntFieldUpdateOperationsInput | number
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    maxValue?: IntFieldUpdateOperationsInput | number
    baseXp?: IntFieldUpdateOperationsInput | number
    successMessage?: NullableStringFieldUpdateOperationsInput | string | null
    failureMessage?: NullableStringFieldUpdateOperationsInput | string | null
    assignedToId?: IntFieldUpdateOperationsInput | number
    lastSentById?: NullableIntFieldUpdateOperationsInput | number | null
    pvpAttackId?: NullableIntFieldUpdateOperationsInput | number | null
    bounceCount?: IntFieldUpdateOperationsInput | number
    abandonmentPenaltyApplied?: BoolFieldUpdateOperationsInput | boolean
    abandonmentPenaltyAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketUncheckedUpdateManyWithoutAttackSourcePlayerInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumTicketCategoryFieldUpdateOperationsInput | $Enums.TicketCategory
    severity?: EnumTicketSeverityFieldUpdateOperationsInput | $Enums.TicketSeverity
    difficulty?: IntFieldUpdateOperationsInput | number
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    maxValue?: IntFieldUpdateOperationsInput | number
    baseXp?: IntFieldUpdateOperationsInput | number
    successMessage?: NullableStringFieldUpdateOperationsInput | string | null
    failureMessage?: NullableStringFieldUpdateOperationsInput | string | null
    assignedToId?: IntFieldUpdateOperationsInput | number
    lastSentById?: NullableIntFieldUpdateOperationsInput | number | null
    pvpAttackId?: NullableIntFieldUpdateOperationsInput | number | null
    bounceCount?: IntFieldUpdateOperationsInput | number
    abandonmentPenaltyApplied?: BoolFieldUpdateOperationsInput | boolean
    abandonmentPenaltyAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketUpdateWithoutAssignedToInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumTicketCategoryFieldUpdateOperationsInput | $Enums.TicketCategory
    severity?: EnumTicketSeverityFieldUpdateOperationsInput | $Enums.TicketSeverity
    difficulty?: IntFieldUpdateOperationsInput | number
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    maxValue?: IntFieldUpdateOperationsInput | number
    baseXp?: IntFieldUpdateOperationsInput | number
    successMessage?: NullableStringFieldUpdateOperationsInput | string | null
    failureMessage?: NullableStringFieldUpdateOperationsInput | string | null
    bounceCount?: IntFieldUpdateOperationsInput | number
    abandonmentPenaltyApplied?: BoolFieldUpdateOperationsInput | boolean
    abandonmentPenaltyAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastSentBy?: PlayerUpdateOneWithoutSentTicketsNestedInput
    attackSourcePlayer?: PlayerUpdateOneWithoutAttackTicketsNestedInput
    pvpAttack?: PvPAttackUpdateOneWithoutTicketsNestedInput
  }

  export type TicketUncheckedUpdateWithoutAssignedToInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumTicketCategoryFieldUpdateOperationsInput | $Enums.TicketCategory
    severity?: EnumTicketSeverityFieldUpdateOperationsInput | $Enums.TicketSeverity
    difficulty?: IntFieldUpdateOperationsInput | number
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    maxValue?: IntFieldUpdateOperationsInput | number
    baseXp?: IntFieldUpdateOperationsInput | number
    successMessage?: NullableStringFieldUpdateOperationsInput | string | null
    failureMessage?: NullableStringFieldUpdateOperationsInput | string | null
    lastSentById?: NullableIntFieldUpdateOperationsInput | number | null
    attackSourcePlayerId?: NullableIntFieldUpdateOperationsInput | number | null
    pvpAttackId?: NullableIntFieldUpdateOperationsInput | number | null
    bounceCount?: IntFieldUpdateOperationsInput | number
    abandonmentPenaltyApplied?: BoolFieldUpdateOperationsInput | boolean
    abandonmentPenaltyAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketUncheckedUpdateManyWithoutAssignedToInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumTicketCategoryFieldUpdateOperationsInput | $Enums.TicketCategory
    severity?: EnumTicketSeverityFieldUpdateOperationsInput | $Enums.TicketSeverity
    difficulty?: IntFieldUpdateOperationsInput | number
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    maxValue?: IntFieldUpdateOperationsInput | number
    baseXp?: IntFieldUpdateOperationsInput | number
    successMessage?: NullableStringFieldUpdateOperationsInput | string | null
    failureMessage?: NullableStringFieldUpdateOperationsInput | string | null
    lastSentById?: NullableIntFieldUpdateOperationsInput | number | null
    attackSourcePlayerId?: NullableIntFieldUpdateOperationsInput | number | null
    pvpAttackId?: NullableIntFieldUpdateOperationsInput | number | null
    bounceCount?: IntFieldUpdateOperationsInput | number
    abandonmentPenaltyApplied?: BoolFieldUpdateOperationsInput | boolean
    abandonmentPenaltyAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketUpdateWithoutLastSentByInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumTicketCategoryFieldUpdateOperationsInput | $Enums.TicketCategory
    severity?: EnumTicketSeverityFieldUpdateOperationsInput | $Enums.TicketSeverity
    difficulty?: IntFieldUpdateOperationsInput | number
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    maxValue?: IntFieldUpdateOperationsInput | number
    baseXp?: IntFieldUpdateOperationsInput | number
    successMessage?: NullableStringFieldUpdateOperationsInput | string | null
    failureMessage?: NullableStringFieldUpdateOperationsInput | string | null
    bounceCount?: IntFieldUpdateOperationsInput | number
    abandonmentPenaltyApplied?: BoolFieldUpdateOperationsInput | boolean
    abandonmentPenaltyAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedTo?: PlayerUpdateOneRequiredWithoutAssignedTicketsNestedInput
    attackSourcePlayer?: PlayerUpdateOneWithoutAttackTicketsNestedInput
    pvpAttack?: PvPAttackUpdateOneWithoutTicketsNestedInput
  }

  export type TicketUncheckedUpdateWithoutLastSentByInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumTicketCategoryFieldUpdateOperationsInput | $Enums.TicketCategory
    severity?: EnumTicketSeverityFieldUpdateOperationsInput | $Enums.TicketSeverity
    difficulty?: IntFieldUpdateOperationsInput | number
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    maxValue?: IntFieldUpdateOperationsInput | number
    baseXp?: IntFieldUpdateOperationsInput | number
    successMessage?: NullableStringFieldUpdateOperationsInput | string | null
    failureMessage?: NullableStringFieldUpdateOperationsInput | string | null
    assignedToId?: IntFieldUpdateOperationsInput | number
    attackSourcePlayerId?: NullableIntFieldUpdateOperationsInput | number | null
    pvpAttackId?: NullableIntFieldUpdateOperationsInput | number | null
    bounceCount?: IntFieldUpdateOperationsInput | number
    abandonmentPenaltyApplied?: BoolFieldUpdateOperationsInput | boolean
    abandonmentPenaltyAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketUncheckedUpdateManyWithoutLastSentByInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumTicketCategoryFieldUpdateOperationsInput | $Enums.TicketCategory
    severity?: EnumTicketSeverityFieldUpdateOperationsInput | $Enums.TicketSeverity
    difficulty?: IntFieldUpdateOperationsInput | number
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    maxValue?: IntFieldUpdateOperationsInput | number
    baseXp?: IntFieldUpdateOperationsInput | number
    successMessage?: NullableStringFieldUpdateOperationsInput | string | null
    failureMessage?: NullableStringFieldUpdateOperationsInput | string | null
    assignedToId?: IntFieldUpdateOperationsInput | number
    attackSourcePlayerId?: NullableIntFieldUpdateOperationsInput | number | null
    pvpAttackId?: NullableIntFieldUpdateOperationsInput | number | null
    bounceCount?: IntFieldUpdateOperationsInput | number
    abandonmentPenaltyApplied?: BoolFieldUpdateOperationsInput | boolean
    abandonmentPenaltyAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketCreateManyPvpAttackInput = {
    id?: number
    title: string
    description: string
    category: $Enums.TicketCategory
    severity?: $Enums.TicketSeverity
    difficulty?: number
    status?: $Enums.TicketStatus
    maxValue: number
    baseXp?: number
    successMessage?: string | null
    failureMessage?: string | null
    assignedToId: number
    lastSentById?: number | null
    attackSourcePlayerId?: number | null
    bounceCount?: number
    abandonmentPenaltyApplied?: boolean
    abandonmentPenaltyAt?: Date | string | null
    resolvedAt?: Date | string | null
    expiredAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TicketUpdateWithoutPvpAttackInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumTicketCategoryFieldUpdateOperationsInput | $Enums.TicketCategory
    severity?: EnumTicketSeverityFieldUpdateOperationsInput | $Enums.TicketSeverity
    difficulty?: IntFieldUpdateOperationsInput | number
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    maxValue?: IntFieldUpdateOperationsInput | number
    baseXp?: IntFieldUpdateOperationsInput | number
    successMessage?: NullableStringFieldUpdateOperationsInput | string | null
    failureMessage?: NullableStringFieldUpdateOperationsInput | string | null
    bounceCount?: IntFieldUpdateOperationsInput | number
    abandonmentPenaltyApplied?: BoolFieldUpdateOperationsInput | boolean
    abandonmentPenaltyAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignedTo?: PlayerUpdateOneRequiredWithoutAssignedTicketsNestedInput
    lastSentBy?: PlayerUpdateOneWithoutSentTicketsNestedInput
    attackSourcePlayer?: PlayerUpdateOneWithoutAttackTicketsNestedInput
  }

  export type TicketUncheckedUpdateWithoutPvpAttackInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumTicketCategoryFieldUpdateOperationsInput | $Enums.TicketCategory
    severity?: EnumTicketSeverityFieldUpdateOperationsInput | $Enums.TicketSeverity
    difficulty?: IntFieldUpdateOperationsInput | number
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    maxValue?: IntFieldUpdateOperationsInput | number
    baseXp?: IntFieldUpdateOperationsInput | number
    successMessage?: NullableStringFieldUpdateOperationsInput | string | null
    failureMessage?: NullableStringFieldUpdateOperationsInput | string | null
    assignedToId?: IntFieldUpdateOperationsInput | number
    lastSentById?: NullableIntFieldUpdateOperationsInput | number | null
    attackSourcePlayerId?: NullableIntFieldUpdateOperationsInput | number | null
    bounceCount?: IntFieldUpdateOperationsInput | number
    abandonmentPenaltyApplied?: BoolFieldUpdateOperationsInput | boolean
    abandonmentPenaltyAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TicketUncheckedUpdateManyWithoutPvpAttackInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: EnumTicketCategoryFieldUpdateOperationsInput | $Enums.TicketCategory
    severity?: EnumTicketSeverityFieldUpdateOperationsInput | $Enums.TicketSeverity
    difficulty?: IntFieldUpdateOperationsInput | number
    status?: EnumTicketStatusFieldUpdateOperationsInput | $Enums.TicketStatus
    maxValue?: IntFieldUpdateOperationsInput | number
    baseXp?: IntFieldUpdateOperationsInput | number
    successMessage?: NullableStringFieldUpdateOperationsInput | string | null
    failureMessage?: NullableStringFieldUpdateOperationsInput | string | null
    assignedToId?: IntFieldUpdateOperationsInput | number
    lastSentById?: NullableIntFieldUpdateOperationsInput | number | null
    attackSourcePlayerId?: NullableIntFieldUpdateOperationsInput | number | null
    bounceCount?: IntFieldUpdateOperationsInput | number
    abandonmentPenaltyApplied?: BoolFieldUpdateOperationsInput | boolean
    abandonmentPenaltyAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resolvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiredAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyUserInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type AccountCreateManyUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}