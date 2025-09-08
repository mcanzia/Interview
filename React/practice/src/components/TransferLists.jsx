import { useState, useMemo } from 'react';

class Item {
    constructor(name, checked = false) {
        this.name = name;
        this.checked = checked;
    }
}

export default function App() {
    const [listOne, setListOne] = useState([new Item('HTML'), new Item('JavaScript'), new Item('CSS'), new Item('TypeScript')]);
    const [listTwo, setListTwo] = useState([new Item('React'), new Item('Angular'), new Item('Vue'), new Item('Svelte')]);

    const allListOneAvailable = useMemo(() => {
        return listTwo.length;
    });

    const allListTwoAvailable = useMemo(() => {
        return listOne.length;
    });

    const selectedListOneAvailable = useMemo(() => {
        return listTwo.some((value) => value.checked);
    });

    const selectedListTwoAvailable = useMemo(() => {
        return listOne.some((value) => value.checked);
    });

    function moveAllToListOne() {
        const newListOne = [...listOne];
        for (let item of listTwo) {
            newListOne.push(item);
        }
        setListOne(newListOne);
        setListTwo([]);
    }

    function moveAllToListTwo() {
        const newListTwo = [...listTwo];
        for (let item of listOne) {
            newListTwo.push(item);
        }
        setListTwo(newListTwo);
        setListOne([]);
    }

    function moveSelectedToListOne() {
        const newListOne = [...listOne];
        const newListTwo = [];
        for (let item of listTwo) {
            if (item.checked) {
                newListOne.push(item);
            } else {
                newListTwo.push(item);
            }
        }
        setListOne(newListOne);
        setListTwo(newListTwo);
    }

    function moveSelectedToListTwo() {
        const newListTwo = [...listTwo];
        const newListOne = [];
        for (let item of listOne) {
            if (item.checked) {
                newListTwo.push(item);
            } else {
                newListOne.push(item);
            }
        }
        setListOne(newListOne);
        setListTwo(newListTwo);
    }

    function setListOneCheckbox(index) {
        const newListOne = [...listOne];
        newListOne[index] = new Item(newListOne[index].name, !newListOne[index].checked)
        setListOne(newListOne)
    }

    function setListTwoCheckbox(index) {
        const newListTwo = [...listTwo];
        newListTwo[index] = new Item(newListTwo[index].name, !newListTwo[index].checked)
        setListTwo(newListTwo)
    }

    const buttonActions = {
        allListOne: { action: moveAllToListOne, available: allListOneAvailable },
        allListTwo: { action: moveAllToListTwo, available: allListTwoAvailable },
        selectedListOne: { action: moveSelectedToListOne, available: selectedListOneAvailable },
        selectedListTwo: { action: moveSelectedToListTwo, available: selectedListTwoAvailable }
    }
    return (
        <div>
            <div className="lists">
                <ItemList items={listOne} setCheckbox={(index) => setListOneCheckbox(index)} />
                <Switcher buttonActions={buttonActions} />
                <ItemList items={listTwo} setCheckbox={(index) => setListTwoCheckbox(index)} />
            </div>
        </div>
    );
}

function Switcher({ buttonActions }) {
    const allToListOne = "<<";
    const selectedToListOne = "<";
    const allToListTwo = ">>";
    const selectedToListTwo = ">";
    return (
        <>
            <fieldset>
                <ul>
                    <button disabled={!buttonActions.allListOne.available} onClick={buttonActions.allListOne.action}>{allToListOne}</button>
                    <button disabled={!buttonActions.selectedListOne.available} onClick={buttonActions.selectedListOne.action}>{selectedToListOne}</button>
                    <button disabled={!buttonActions.selectedListTwo.available} onClick={buttonActions.selectedListTwo.action}>{selectedToListTwo}</button>
                    <button disabled={!buttonActions.allListTwo.available} onClick={buttonActions.allListTwo.action}>{allToListTwo}</button>
                </ul>
            </fieldset>
        </>
    )
}

function ItemList({ items, setCheckbox }) {
    return (
        <>
            <fieldset>
                <ul>
                    {
                        items.map((item, index) => (
                            <SingleItem key={item.name} index={index} item={item} setCheckbox={(cIndex) => setCheckbox(cIndex)} />
                        ))

                    }
                </ul>
            </fieldset>
        </>
    )
}

function SingleItem({ item, index, setCheckbox }) {
    function handleCheckboxClick(e) {
        setCheckbox(index);
    }
    return (
        <>
            <div className="item">
                <input id={item} type="checkbox" checked={item.checked} onChange={handleCheckboxClick} />
                <li>{item.name}</li>
            </div>
        </>
    )
}
