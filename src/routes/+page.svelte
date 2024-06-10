<script lang="ts">
    import { validateWFF } from "$lib";
    import Wff from "$lib/wff.svelte";
    let blox = ["p", "q", "r", "s", "C", "A", "K", "E", "N"];
    let blox_lower = ["p", "q", "r", "s", "c", "a", "k", "e", "n"];
    let wff = "";
    $: wff = wff
        .split("")
        .filter((char) => {
            let char_lower = char.toLowerCase();
            if (blox_lower.includes(char_lower)) {
                return true;
            }
        })
        .map((char) => {
            return blox[blox_lower.indexOf(char.toLowerCase())];
        })
        .join("");
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
                bind:value={wff}
            />
            <button class="bg-gray-200/60 p-2 rounded-md shadow-sm">
                validate
            </button>
        </form>

        <ol class="grid gap-2 items-center justify-center grid-flow-col">
            {#each wff as char}
                <li
                    class="w-12 h-12 border-4 border-black hover:scale-110 flex items-center justify-center"
                >
                    {char}
                </li>
            {/each}
        </ol>
        {#if wff.length > 0}
            {#if validateWFF(wff)}
                <span class="text-green-500">Valid WFF</span>
            {:else}
                <span class="text-red-500">Invalid WFF</span>
            {/if}
        {/if}
    </div>
</main>
