import { useState, useMemo, useRef, useEffect, use, createContext } from 'react';
import './TransferLists.css';

class Item {
    constructor(name, checked = false) {
        this.name = name;
        this.checked = checked;
    }
}

export default function TransferLists() {
    const [listOne, setListOne] = useState([new Item('HTML'), new Item('JavaScript'), new Item('CSS'), new Item('TypeScript')]);
    const [listTwo, setListTwo] = useState([new Item('React'), new Item('Angular'), new Item('Vue'), new Item('Svelte')]);

    function allChecked(list) {
        return list.every((item) => item.checked);
    }

    const selectedListOneAvailable = useMemo(() => listTwo.some(i => i.checked), [listTwo]);
    const selectedListTwoAvailable = useMemo(() => listOne.some(i => i.checked), [listOne]);

    function moveSelectedToOtherList(toList, toUpdateFn, fromList, fromUpdateFn) {
        const newToList = [...toList];
        const newFromList = [];
        for (let item of fromList) {
            if (item.checked) {
                newToList.push(item);
            } else {
                newFromList.push(item);
            }
        }
        toUpdateFn(newToList);
        fromUpdateFn(newFromList);
    }

    function setListCheckbox(index, list, updateFunction) {
        let newList = [...list];
        newList[index] = new Item(newList[index].name, !newList[index].checked)
        updateFunction(newList)
    }

    function checkAllList(list, updateFunction, action) {
        let newList = [...list];
        newList = newList.map((item) => {
            return { ...item, checked: action === 'check' ? true : false }
        });
        updateFunction(newList);
    }

    function addItem(item, list, updateFunction) {
        let newList = [...list, new Item(item)]
        updateFunction(newList);
    }

    const buttonActions = {
        selectedListOne: {
            action: () => moveSelectedToOtherList(listOne, setListOne, listTwo, setListTwo),
            available: selectedListOneAvailable
        },
        selectedListTwo: {
            action: () => moveSelectedToOtherList(listTwo, setListTwo, listOne, setListOne),
            available: selectedListTwoAvailable
        },
        addItem: {
            action: (item, list, updateFunction) => addItem(item, list, updateFunction),
            available: true
        }
    }
    return (
        <div>
            <div className="lists">
                <ItemList
                    items={listOne}
                    setCheckbox={(index) => setListCheckbox(index, listOne, setListOne)}
                    allChecked={allChecked(listOne)}
                    addItem={(item) => addItem(item, listOne, setListOne)}
                    checkAll={(action) => checkAllList(listOne, setListOne, action)}
                />
                <Switcher buttonActions={buttonActions} />
                <ItemList
                    items={listTwo}
                    setCheckbox={(index) => setListCheckbox(index, listTwo, setListTwo)}
                    allChecked={allChecked(listTwo)}
                    addItem={(item) => addItem(item, listTwo, setListTwo)}
                    checkAll={(action) => checkAllList(listTwo, setListTwo, action)}
                />
            </div>
        </div>
    );
}

function Switcher({ buttonActions }) {
    const selectedToListOne = "<";
    const selectedToListTwo = ">";
    return (
        <>
            <fieldset>
                <ul>
                    <button disabled={!buttonActions.selectedListOne.available} onClick={buttonActions.selectedListOne.action}>{selectedToListOne}</button>
                    <button disabled={!buttonActions.selectedListTwo.available} onClick={buttonActions.selectedListTwo.action}>{selectedToListTwo}</button>
                </ul>
            </fieldset>
        </>
    )
}

function SelectAll({ items, allChecked, checkAll }) {
    const numSelected = useMemo(() => {
        return items.filter((value) => value.checked).length
    }, [items])

    const checkboxRef = useRef(null);

    // useEffect(() => {
    //   if (checkboxRef.current) {
    //     checkboxRef.current.indeterminate = true;
    //   }
    // }, []);
    return (
        <>
            <div className="selectAllBox">
                {allChecked ?
                    <input onChange={() => checkAll("uncheck")} ref={checkboxRef} type="checkbox" /> :
                    <input checked={allChecked} onChange={() => checkAll("check")} type="checkbox" />}
                <label>{numSelected} / {items.length} Selected</label>
            </div>
        </>
    )
}

function ItemList({ items, setCheckbox, allChecked, checkAll, addItem }) {

    const [addItemInput, setAddItemInput] = useState("");
    function handleOnChange(e) {
        setAddItemInput(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        addItem(addItemInput);
        setAddItemInput("");
    }
    return (
        <>
            <fieldset>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={addItemInput} onChange={handleOnChange} />
                    <button type="submit">Add</button>
                </form>
                <hr />
                <SelectAll items={items} allChecked={allChecked} checkAll={checkAll} />
                <hr />
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
