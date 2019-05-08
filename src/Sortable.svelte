<svelte:window
    bind:innerWidth={sw}
    bind:innerHeight={sh}
    on:mousemove={updateGlobalMousePosition}
    on:mouseup={stopDragging}
/>

<div class="sortable" style="user-select: none;">
    {#each items as item, i}
        <div class="sortable-item" class:sortable-dragging={item.__isDragging}
            on:mousedown={event => startDragging(event, i)}
            on:mousemove={event => updateDraggingIndex(event, i)}>
            <slot {item} {i} />
        </div>
    {/each}
</div>

<script>
    let dragging = null,
        index = null,
        my = 0,
        sw = 0,
        sh = 0;

    export let items = [];

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

            items = [...items];
        }
    }

    function startDragging(event, i) {
        dragging = items.splice(index = i, 1).pop();
    }

    function stopDragging(event) {
        items = items.map(item => (delete item.__isDragging, item));
        dragging = null;
    }

    function updateDraggingIndex(event, i) {
        if (i === index) {
            return;
        }

        index = parseInt(event.target.offsetTop + event.target.offsetHeight) <= my
            ? i + 1
            : i;
    }

    function updateGlobalMousePosition(event) {
        if (dragging) {
            my = event.clientY;
        }
    }
</script>
