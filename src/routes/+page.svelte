<script lang="ts">
    import { isWFF, reasons, rollDice, type LogicUnit } from "$lib";
    import Wff from "$lib/wff.svelte";

    interface gameData {
        practice: boolean;
        turn: number;
        active_player: number;
        player1_score: number;
        player2_score: number;
    }
    let data = {
        practice: false,
        turn: 1,
        active_player: 1,
        player1_score: 0,
        player2_score: 0,
    } as gameData;

    let validLogicalUnits = ["p", "q", "r", "s", "N", "C", "A", "K", "E"];
    let validLogicalUnitsLower = ["p", "q", "r", "s", "n", "c", "a", "k", "e"];
    let pool = rollDice(data.turn + 2);
    let remaining_pool = pool;
    let rawExp = "";
    $: rawExp = rawExp
        .split("")
        .map((char) => {
            if (validLogicalUnitsLower.includes(char.toLowerCase())) {
                // get the corresponding case letter
                let sponding = validLogicalUnits[
                    validLogicalUnitsLower.indexOf(char.toLowerCase())
                ] as LogicUnit;
                return sponding;
            }
        })
        .join("");

    let exp: LogicUnit[] = ["A"];
    $: exp = rawExp.split("").map((char) => char as LogicUnit);
    $: pool = rollDice(data.turn + 2);
    $: remaining_pool = pool;
</script>

<main
    class="place-items-center w-full h-full flex flex-row text-center font-mono justify-center items-center"
>
    <div class="flex mx-auto w-2/3 mt-40 flex-col text-lg gap-20 items-center">
        <button
            class="font-medium text-black select-none"
            on:click={() => {
                data.practice = !data.practice;
                rawExp = "";
                data.turn = 1;
                data.active_player = 1;
                data.player1_score = 0;
                data.player2_score = 0;
                pool = rollDice(data.turn + 2);
            }}
        >
            {#if data.practice}
                start game
            {:else}
                end game
            {/if}
        </button>
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
            <span class="flex flex-row mt-4">
                <h1>
                    turn: {data.turn} | score: {data.player1_score}, {data.player2_score}
                </h1>

                <h1 class="ml-auto">
                    {#if data.active_player === 1}
                        player 1
                    {:else}
                        player 2
                    {/if}
                </h1>
            </span>
        </span>
        <form class="flex justify-center w-full gap-4 mt-40 flex-col">
            <!-- svelte-ignore a11y-autofocus -->
            <input
                type="text"
                autofocus
                placeholder=""
                class="font-mono placeholder-black text-center border-b-4 border-black h-12 outline-none w-2/3 mx-auto"
                bind:value={rawExp}
            />

            <div class="flex flex-row mx-auto gap-4">
                <button
                    class="bg-gray-200/60 p-2 rounded-md shadow-sm"
                    on:click={() => {
                        // todo
                    }}
                >
                    challenge
                </button>
                <button
                    class="bg-gray-200/60 p-2 rounded-md shadow-sm"
                    on:click={() => {
                        // score the current expression, and then add that score to whoever's turn it is
                        if (isWFF(exp.join("")) && exp.length > 0) {
                            if (data.active_player === 1) {
                                data.player1_score += exp.length;
                            } else {
                                data.player2_score += exp.length;
                            }
                            data.active_player =
                                data.active_player === 1 ? 2 : 1;
                            data.turn =
                                data.active_player === 1
                                    ? data.turn + 1
                                    : data.turn;
                            pool = rollDice(data.turn + 2);
                            rawExp = "";
                        }
                    }}
                >
                    validate
                </button>
            </div>
        </form>
        {#if data.practice}
            <ol class="grid gap-2 items-center justify-center grid-flow-col">
                {#each $reasons as reason, i}
                    <div
                        class="border-4 border-black p-3 gap-2 grid grid-flow-row"
                    >
                        {#each reason.units[0] as char}
                            <li
                                class="w-12 h-12 border-4 border-black hover:scale-110 flex items-center justify-center"
                            >
                                {char}
                            </li>
                        {/each}
                        {reason.rule}
                    </div>
                {/each}
            </ol>
            {#if !isWFF(exp.join("")) && exp.length > 0}
                <span class="text-red-500">Invalid WFF</span>
            {/if}
        {:else}
            <!-- the actual game goes here mynx -->
            <ol class="grid gap-2 items-center justify-center grid-flow-col">
                {#each remaining_pool as die}
                    <button
                        class="w-12 h-12 border-4 border-black flex items-center justify-center"
                        on:click={() => {
                            rawExp += die;
                        }}
                    >
                        {die}
                    </button>
                {/each}
            </ol>
        {/if}
    </div>
</main>
