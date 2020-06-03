function populateUFs(){


    var ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( (states) => {

        for(state of states){

            ufSelect.innerHTML +=  `<option value="${state.id}">${state.nome}</option>`

        }

    })

}

populateUFs()

function getCities(event){

    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")
    const ufValue = event.target.value
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    citySelect.innerHTML = `<option value> Selecione a Cidade</option>`
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( (cities) => {

        for(city of cities){

            citySelect.innerHTML += `<option value ="${city.nome}">${city.nome}</option>`

        }

        citySelect.disabled = false

    })

}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


    //Itens de Coleta

    const itemsToColect = document.querySelectorAll(".items-grid li")
    let selectedItems = []
    for (const item of itemsToColect){

        item.addEventListener("click", handleSelectedItem)

    }

    const collectedItems = document.querySelector("input[name=items]")
    
    function handleSelectedItem(event){

        const itemLi = event.target
        //Adicionar ou Remover classe com  js
        itemLi.classList.toggle("selected")
        const itemId = itemLi.dataset.id
       

        //verificar se existem os itens selecionados, se sim
        // pegar os itens selecionados retornando true or false
        // retornando a posicao do vetor (findIndex)
        const alreadySelected = selectedItems.findIndex( item => item == itemId)

        //se ja estiver selecionado tirar da selecao
        if(alreadySelected != -1){

            const filteredItems = selectedItems.filter(item => item != itemId)
            selectedItems = filteredItems

        }else{

            //se não estiver selecionado, adicionar a selecao
            selectedItems.push(itemId)

        }
        
        //atualizar campo escondido
        collectedItems.value = selectedItems

    }