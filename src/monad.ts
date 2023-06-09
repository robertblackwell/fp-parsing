/**
 * In this project the goal is to use Categorical concepts like Functor, Applicative and Monad 
 * from Haskell to implement a parser for arithmetic expressions in Typescript. Haskell implements such 
 * concepts as Type Classes. How should we implement them in Typescript?
 * 
 * What is needed:
 * 
 * -    A generic type, for example `Maybe<T>`
 * -    A number of functions or class static member functions. For example `Maybe.just()`. Ideally we would like
 * to be able to have the compiler check that all required functions are provided and have the correct signature.
 * -    Maybe some type/class member fuunctions. Again we would like to have the compiler check that the required
 * functions are provided and hve the correct signature.
 * 
 * An obvious solution is to make `Functor`, `Applicable`, `Monad` etc as generic classes with specified
 * static and member functions.
 * 
 * For example we could define the `Maybe` monad as:
 * 
 * ```ts
 * 
 *      class Maybe<T> extends Monad<T> {
 *          private value: T | null
 *          private constructor() {
 *              this.value = null
 *          }
 *          static make<T>(t: T): Maybe<T> {
 *              let obj = new Maybe<T>()
 *              obj.value = t;
 *              return obj
 *          }
 *          static nothing<T>(): Maybe<T> {
 *              return new Maybe<T>()
 *          }
 *          static isNothing<T>(): boolean {
 *              return (this.value == null)
 *          }
 *          static get_value(v: Maybe<T>): T {
 *              if(this.value == null) {
 *                  throw new Error(`cannot get value of nothing)
 *              }
 *              return this.value as T
 *          }
 *          //.... plsu implementations of
 *          static pure<T>(t: T): Monad<T> {
 *          }
 *          static mu<T>(tt: Monad<Monad<T>): Monad<T> {
 *          }
 *          static bind<T, S>(mt: Monad<T>, f: (s: S) => Monad<T>): (mt: Monad<T>) {
 *          }
 *      }
 * ```
 * where Monad<T> is the following abstract class
 * 
 * ```ts
 *      abstract class Monad<T>{ 
 *          abstract static make<T>(t: T): Monad<T>
 *          abstract static pure<T>(t: T): Monad<T>;
 *          abstract static mu<T>(tt: Monad<Monad<T>): Monad<T>;
 *          abstract static bind<T, S>(mt: Monad<T>, f: (s: S) => Monad<T>): (mt: Monad<T>);
 *          
 *      }
 * ```
 */