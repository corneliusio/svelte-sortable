<svelte:window
    bind:innerWidth={sw}
    bind:innerHeight={sh}
    on:mouseup={stopDragging}
    on:mousemove={updateGlobalMousePosition}
/>

<div class="sortable" style={dragging ? 'user-select: none; cursor: grabbing;' : 'cursor: grab;'}>
    {#each items as item, index}
        {#if item.__isDragging}
            <div class="sortable-item sortable-dragging" bind:this={el}>
                <slot {item} {index} />
            </div>
        {:else}
            <div class="sortable-item"
                on:mousedown={event => startDragging(event, index)}
                on:mousemove={event => el && updateDraggingIndex(event, index)}>
                <slot {item} {index} />
            </div>
        {/if}
    {/each}
</div>

<script>
    export let items = [];

    let movePrev = false,
        moveNext = false,
        dragging = null,
        index = null,
        el = null,
        hcy = 0,
        hcx = 0,
        dt = 0,
        dr = 0,
        db = 0,
        dl = 0,
        mx = 0,
        my = 0,
        sw = 0,
        sh = 0;

    $: if (dragging) {
        const placeholder = items.findIndex(item => item.__isDragging);

        if (placeholder !== index) {
            (placeholder > -1) && items.splice(placeholder, 1);

            if (index !== null) {
                if (index !== items.length) {
                    items.splice(index, 0, { ...dragging, __isDragging: true });
                } else {
                    items.push({ ...dragging, __isDragging: true });
                }
            }

            items = [ ...items ];
        }
    }

    function startDragging(event, i) {
        (selection => {
            selection.empty && selection.empty();
            selection.removeAllRanges && selection.removeAllRanges();
        })(window.getSelection ? window.getSelection() : document.selection);
        dragging = items.splice(index = i, 1).pop();
    }

    function stopDragging(event) {
        items = items.map(item => (delete item.__isDragging, item));
        dt = dl = db = dr = 0;
        dragging = null;
        index = null;
    }

    function updateDraggingIndex(event, i) {
        dt = el.offsetTop;
        dl = el.offsetLeft;
        db = dt + el.offsetHeight;
        dr = dl + el.offsetWidth;

        hcy = event.target.offsetTop + (event.target.offsetHeight / 2);
        hcx = event.target.offsetLeft + (event.target.offsetWidth / 2);
        movePrev = (hcy < dt && my < hcy) || (hcx < dl && mx < hcx);
        moveNext = (hcy > db && my > hcy) || (hcx > dr && mx > hcx);

        if (movePrev || moveNext) {
            index = i;
        }
    }

    function updateGlobalMousePosition(event) {
        if (dragging) {
            mx = event.clientX;
            my = event.clientY;
        }
    }
</script>
