<script lang="ts">
    import { validateExpression, type Expression, type LogicUnit } from "$lib";
    import Wff from "$lib/wff.svelte";

    let validLogicalUnits = ["p", "q", "r", "s", "N", "C", "A", "K", "E"];
    let validLogicalUnitsLower = ["p", "q", "r", "s", "n", "c", "a", "k", "e"];
    let rawExp = "";
    // case match with validLogicalUnits
    $: rawExp = rawExp
        .split("")
        .map((char) => {
            if (validLogicalUnitsLower.includes(char.toLowerCase())) {
                return validLogicalUnits[
                    validLogicalUnitsLower.indexOf(char.toLowerCase())
                ];
            }
        })
        .join("");
    let exp: Expression = ["A"];
    $: exp = rawExp.split("").map((char) => char as LogicUnit);
</script>

<main
    class="place-items-center w-full h-full flex flex-row text-center font-mono justify-center items-center"
>
    <div class="flex mx-auto w-2/3 mt-40 flex-col text-lg gap-20">
        <span class="text-left">
            A given expression is a <Wff /> if and only if
            <ol class="grid grid-flow-row text-left w-2/3 mx-auto gap-1 mt-2">
                <li>(C1) it is a 'p', 'q', 'r', or 's'.</li>
                <li>
                    (C2) it is a two-unit expression in which the first unit is
                    an 'N' and the second unit is a <Wff />.
                </li>

                <li>
                    (C3) it is a three-unit expression in which the first unit
                    is a 'C', 'A', 'K', or 'E' and the second and third units
                    are <Wff />.
                </li>
            </ol>
        </span>
        <form class="flex justify-center w-full gap-4">
            <!-- svelte-ignore a11y-autofocus -->
            <input
                type="text"
                autofocus
                placeholder=""
                class="font-mono placeholder-black text-center border-b-4 border-black h-12 outline-none w-2/3"
                bind:value={rawExp}
            />
            <!-- <button -->
            <!--     class="bg-gray-200/60 p-2 rounded-md shadow-sm" -->
            <!-- > -->
            <!--     validate -->
            <!-- </button> -->
        </form>

        <ol class="grid gap-2 items-center justify-center grid-flow-col">
            {#each exp as char}
                <li
                    class="w-12 h-12 border-4 border-black hover:scale-110 flex items-center justify-center"
                >
                    {char}
                </li>
            {/each}
        </ol>
        <!-- {#if exp.body.length > 0} -->
        {#if validateExpression(exp)}
            <span class="text-green-500">Valid WFF</span>
        {:else}
            <span class="text-red-500">Invalid WFF</span>
        {/if}
        <!-- {/if} -->
    </div>
</main>
