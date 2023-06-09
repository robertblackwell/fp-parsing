import * as PP from "../src/parser_pair"
import * as PR from "../src/parser_result"
import * as PT from "../src/parser_type"
import * as Maybe from "../src/maybe"
import * as APP from "../src/parser_applicative"
import {assert, display_one, display_two, display_three} from "./test_helpers"

/**
 * Typescript does not have an equivalent to the Haskell `do {}` construct so we cannot demonstrate it directly.
 * However even in Haskell the `do{}` construct is only syntactic sugar for `ma >>= (x -> mb >>= (y -> ...... (z-> f(x,y, ...z))))`.
 * This can be demonstrated in typescript.
 */
export function test_do() {
    function div(a: number, b: number): Maybe.Maybe<number> {
        if( b > -0.1 && b < 0.1) 
            return Maybe.nothing()
        return Maybe.just(a / b)
    }
    function sum(a: number, b: number): number {
        return a + b
    } 
    /*
    * whenever one sees an unpacking of a Maybe<T> value to apply a fuunction to it
    * should think of using Maybe.bind. And in Haskell think "do {}".
    * 
    * What problem is being solved by the do notation ?
    * 
    */
    function do_without_bind() {
        // a demonstration of `do` without any monadic stuff
        function combine(ma: Maybe.Maybe<number>, mb: Maybe.Maybe<number>): Maybe.Maybe<number> {
            if(Maybe.isNothing(mb)) {
                return Maybe.nothing()
            } 
            if(Maybe.isNothing(mb)) {
                return Maybe.nothing()
            }
            return div(Maybe.get_value(ma), Maybe.get_value(mb))
        }
        const ma = div(12, 2)
        const mb = div(12, 4)
        const mc = combine(ma, mb)
        assert(!Maybe.isNothing(mc), "do _without_bind_demo ! isNothing()")
        assert(Maybe.get_value(mc) == 2, "do _without_bind_demo assert value is 2")
        console.log(`do _without_bind_demo result is ${mc}`)

    }
    
    function test_do_01() {
        const ma = div(12, 2)
        const mb = div(12, 4)
        // the next line is do { a <- ma; b <- mb; return div(a,b)}
        const mc = Maybe.bind(ma, (a) => Maybe.bind(mb, (b) => div(a,b)))
        assert(!Maybe.isNothing(mc), "test_do_01 assert ! isNothing()")
        assert(Maybe.get_value(mc) == 2, "test_do_01 assert value is 2")
        console.log(`test_do_01 result is ${mc}`)
    }
    function test_do_02() {
        const ma = div(6, 2)
        const mb = div(12, 4)
        const mc = Maybe.bind(ma, (a) => Maybe.bind(mb, (b) => Maybe.just(sum(a,b))))
        assert(!Maybe.isNothing(mc), "test_do_02 assert ! isNothing()")
        assert(Maybe.get_value(mc) == 6, "test_do_02 assert value is 6")
        console.log(`test_do_02 result is ${mc}`)
    }
    function test_do_03() {
        const ma = div(3, 0)
        const mb = div(12, 4)
        const mc = Maybe.bind(ma, (a) => Maybe.bind(mb, (b) => div(a,b)))
        assert(Maybe.isNothing(mc), "test_do_03 assert  isNothing() as expected")
        console.log(`test_do_03 result is ${mc}`)
    }
    do_without_bind()
    test_do_01()
    test_do_02()
    test_do_03()
}
// test_do();