(async () => {

    const root = document.getElementById('__raregems_collection_widget')
    if (!root) return

    const [chain, collection] = [root.dataset.chain, root.dataset.collection]
    if (!chain || !collection) return

    root.href = root.href + chain + '/' + collection

    const dark = root.dataset.theme != 'light'

    root.innerHTML = `
        <style>
            #__raregems_collection_widget {
                all: unset; box-sizing: border-box; padding: 12px; border: 2px solid ${dark ? '#212529' : '#ced4da'}; border-radius: 8px; background: ${dark ? '#131316' : '#f8f9fa'}; color: ${dark ? '#f8f9fa' : '#212529'};
                font-family: system-ui; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-transform: uppercase; cursor: pointer;
            }
            #__raregems_collection_widget:hover { border-color: #228be6; }
            #__raregems_collection_widget .__rg_header { font-size: 10px; font-weight: bold; letter-spacing: 1px; color: ${dark ? '#868e96' : '#868e96'}; text-align: center; }
            #__raregems_collection_widget .__rg_header img { display: block; margin: -1px auto 0; }
            #__raregems_collection_widget .__rg_items { display: flex; gap: 8px; margin-top: 8px; }
            #__raregems_collection_widget .__rg_item { flex: 1; padding: 8px; text-align: center; background: ${dark ? '#212529' : '#dee2e6'}; border-radius: 8px; }
            #__raregems_collection_widget .__rg_name { font-size: 10px; text-transform: uppercase; color: ${dark ? '#adb5bd' : '#495057'}; }
            #__raregems_collection_widget .__rg_value { margin-top: 4px; font-size: 16px; font-weight: bold; }
            #__raregems_collection_widget .__rg_value img { display: inline-block; vertical-align: -2px; }
        </style>
        <div class="__rg_header">
            Tradable on
            <img src="https://s.raregems.io/img/logo${dark ? '_white' : '_black'}.svg" width="100" height="21">
        </div>
        <div class="__rg_items">
            <div class="__rg_item">
                <div class="__rg_name">tokens</div>
                <div class="__rg_value">—</div>
            </div>
            <div class="__rg_item">
                <div class="__rg_name">owners</div>
                <div class="__rg_value">—</div>
            </div>
            <div class="__rg_item">
                <div class="__rg_name">offers</div>
                <div class="__rg_value">—</div>
            </div>
            <div class="__rg_item">
                <div class="__rg_name">floor</div>
                <div class="__rg_value">—</div>
            </div>
        </div>
    `

    const r = await (await fetch(`https://raregems.io/api/collection_widget?chain=${chain}&collection=${collection}`)).json()

    const items = root.querySelectorAll('.__rg_item')
    items[0].lastElementChild.textContent = r.tokens_count
    items[1].lastElementChild.textContent = r.owners_count
    items[2].lastElementChild.textContent = r.offers_count
    items[3].lastElementChild.innerHTML = `<img src="https://s.raregems.io/img/chains/${chain}.svg" width="16" height="16"> ${r.floor_price}`

})()