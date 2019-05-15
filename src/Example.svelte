<input type="text" bind:value on:keydown={onKeydown}>

<Sortable bind:items let:item>
    <pre>{JSON.stringify(item.title, null, 2)}</pre>
</Sortable>

<script>
    import Sortable from './Sortable.svelte';

    let value = '',
        items = [
            { title: 'Lorem ipsum id' },
            { title: 'Lorem ipsum eiusmod pariatur' },
            { title: 'Lorem ipsum reprehenderit dolore' },
            { title: 'Duis' },
            { title: 'Ex dolore ullamco consequat' },
            { title: 'Lorem ipsum minim in amet dolore' },
            { title: 'Non tempor' },
            { title: 'Incididunt' },
            { title: 'Labore excepteur do excepteur' },
            { title: 'Officia sint' },
            { title: 'Amet aute commodo' },
            { title: 'Eiusmod aute dolor' },
            { title: 'Lorem ipsum id' },
            { title: 'Lorem ipsum eiusmod pariatur' }
        ];

    function onKeydown(event) {
        switch (event.key) {
            case 'Escape' :
                value = '';
                break;
            case 'Enter' :
                items.unshift({ title: value });
                items = [ ...items ];
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
        justify-content: center;
        padding: 5%;
        color: #FFF;
    }

    :global(.sortable-item) {
        transition: transform 512ms;
    }

    :global(.sortable-item.sortable-dragging) {
        background-color: color(#FFF alpha(0.25));
        opacity: 0.75;
        box-shadow: 0 0 0 1px #FFF;
        transform: scale(1.1);
    }

    input {
        display: block;
        width: 100%;
        padding: 0.5rem 0.75rem;
        margin-bottom: 2rem;
        border: 0;
        font-size: inherit;
        color: #FFF;
        line-height: 1.5;
        background-color: color(#FFF alpha(0.25));
        border-radius: 0.2rem;
        outline: none;
    }

    pre {
        padding: 0.5rem;
        margin: 0;
    }
</style>
