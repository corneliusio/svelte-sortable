<svelte:window
    bind:innerWidth={sw}
    bind:innerHeight={sh}
    on:mousemove={updateGlobalMousePosition}
    on:mouseup={stopDragging}
/>

<div class="sortable" style="user-select: none;">
    {#each items as item, i}
        <div class="sortable-item" class:sortable-dragging={item.dragging}
            on:mousedown={event => startDragging(event, i)}
            on:mousemove={event => updateDraggingIndex(event, i)}>
            <slot {item} {i} />
        </div>
    {/each}
</div>

<script>
    let dragging = null,
        index = null,
        // el = null,
        // mx = 0,
        my = 0,
        // ox = 0,
        // oy = 0,
        // px = 0,
        // py = 0,
        sw = 0,
        sh = 0;

    export let items = [];

    $: if (dragging) {
        const placeholder = items.findIndex(item => item.dragging);

        if (placeholder !== index) {
            (placeholder > -1) && items.splice(placeholder, 1);

            if (index !== null) {
                if (index !== items.length) {
                    items.splice(index, 0, { ...dragging, dragging: true });
                } else {
                    items.push({ ...dragging, dragging: true });
                }
            }

            items = [...items];
        }

        // if (el) {
        //     el.style.opacity = 0.5;
        //     el.style.position = 'absolute';
        //     el.style.top = `${Math.max(0, Math.min(py, sh - oh))}px`;
        //     el.style.left = `${Math.max(0, Math.min(px, sw - ow))}px`;
        //     el.style.transform = `translate(${mx - ox}px, ${my - oy}px)`;
        // }
    }
    // else if (el) {
    //     el.style.position = 'static';
    //     el.style.top = 0;
    //     el.style.left = 0;
    //     el.style.transform = 'none';
    // }

    function startDragging(event, i) {
        // px = parseInt(event.target.getBoundingClientRect().left);
        // py = parseInt(event.target.getBoundingClientRect().top);
        // ox = event.clientX;
        // oy = event.clientY;
        // el = stringToNode(event.target.outerHTML);
        // document.body.insertBefore(el, document.body.firstChild);
        [dragging] = items.splice(index = i, 1);
        // updateGlobalMousePosition(event);
    }

    function stopDragging(event) {
        // mx = ox = my = oy = 0;

        items = items.map(item => (delete item.dragging, item));
        // el && el.remove();
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
            // mx = event.clientX;
            my = event.clientY;
        }
    }

    // function stringToNode(html) {
    //     const template = document.createElement('template');

    //     template.innerHTML = html.trim();

    //     return template.content.firstChild;
    // }
</script>
