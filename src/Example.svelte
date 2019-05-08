<input type="text" bind:value on:keydown={onKeydown}>

<Sortable bind:items let:item>
    <pre>{JSON.stringify(item, null, 2)}</pre>
</Sortable>

<script>
    import Sortable from './Sortable.svelte';

    let value = '';

    let items = [
        { title: 'Velit nostrud ut.' },
        { title: 'Minim fugiat ut aliqua.' },
        { title: 'Est exercitation minim.' },
        { title: 'Lorem ipsum sit consectetur.' }
    ];

    function onKeydown(event) {
        switch (event.key) {
            case 'Escape' :
                value = '';
                break;
            case 'Enter' :
                items.unshift({ title: value });
                items = [...items];
                value = '';
                break;
        }
    }
</script>

<style type="text/postcss">
    :global(html) {
        font-size: 18px;
    }

    :global(body) {
        display: flex;
        padding: 5%;
        justify-content: center;
        color: #FFF;
    }

    :global(.sortable-dragging) {
        background-color: color(#FFF alpha(0.25));
        box-shadow: 0 0 0 1px #FFF;
        opacity: 0.75;
    }

    input {
        display: block;
        line-height: 1.5;
        padding: 0.5rem 0.75rem;
        font-size: inherit;
        background-color: color(#FFF alpha(0.25));
        color: #FFF;
        border-radius: 0.2rem;
        outline: none;
        border: 0;
        width: 100%;
        margin-bottom: 2rem;
    }

    pre {
        margin: 0;
        padding: 0.5rem;
    }
</style>
