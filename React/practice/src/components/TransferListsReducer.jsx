import { useReducer, useMemo, useState, useEffect, useRef } from "react";

const uid = () => (crypto.randomUUID?.() ?? Math.random().toString(36).slice(2));
const makeItem = (name, checked = false) => ({ id: uid(), name, checked });

const initialState = {
    listOne: ["HTML", "JavaScript", "CSS", "TypeScript"].map(n => makeItem(n)),
    listTwo: ["React", "Angular", "Vue", "Svelte"].map(n => makeItem(n)),
};

function reducer(state, action) {
    switch (action.type) {
        case "TOGGLE": {
            const next = state[action.list].map((it, i) =>
                i === action.index ? { ...it, checked: !it.checked } : it
            );
            return { ...state, [action.list]: next };
        }
        case "CHECK_ALL": {
            const next = state[action.list].map(it => ({ ...it, checked: action.checked }));
            return { ...state, [action.list]: next };
        }
        case "ADD": {
            const next = [...state[action.list], makeItem(action.name)];
            return { ...state, [action.list]: next };
        }
        case "MOVE_SELECTED": {
            const fromArr = state[action.from];
            const toArr = state[action.to];
            const moved = fromArr.filter(i => i.checked).map(i => ({ ...i, checked: false }));
            const remaining = fromArr.filter(i => !i.checked);
            return { ...state, [action.from]: remaining, [action.to]: [...toArr, ...moved] };
        }
        default:
            return state;
    }
}

export default function TransferListsReducer() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const selectedInOne = useMemo(() => state.listOne.some(i => i.checked), [state.listOne]);
    const selectedInTwo = useMemo(() => state.listTwo.some(i => i.checked), [state.listTwo]);

    const allCheckedOne = state.listOne.length > 0 && state.listOne.every(i => i.checked);
    const allCheckedTwo = state.listTwo.length > 0 && state.listTwo.every(i => i.checked);

    return (
        <div className="lists">
            <ItemList
                items={state.listOne}
                allChecked={allCheckedOne}
                onToggle={idx => dispatch({ type: "TOGGLE", list: "listOne", index: idx })}
                onCheckAll={checked => dispatch({ type: "CHECK_ALL", list: "listOne", checked })}
                onAdd={name => dispatch({ type: "ADD", list: "listOne", name })}
            />

            <fieldset>
                <button
                    disabled={!selectedInTwo}
                    onClick={() => dispatch({ type: "MOVE_SELECTED", from: "listTwo", to: "listOne" })}
                >
                    {"<"}
                </button>
                <button
                    disabled={!selectedInOne}
                    onClick={() => dispatch({ type: "MOVE_SELECTED", from: "listOne", to: "listTwo" })}
                >
                    {">"}
                </button>
            </fieldset>

            <ItemList
                items={state.listTwo}
                allChecked={allCheckedTwo}
                onToggle={idx => dispatch({ type: "TOGGLE", list: "listTwo", index: idx })}
                onCheckAll={checked => dispatch({ type: "CHECK_ALL", list: "listTwo", checked })}
                onAdd={name => dispatch({ type: "ADD", list: "listTwo", name })}
            />
        </div>
    );
}

function ItemList({ items, allChecked, onToggle, onCheckAll, onAdd }) {
    const [text, setText] = useState("");
    const numSelected = items.filter(i => i.checked).length;
    const partial = numSelected > 0 && numSelected < items.length;

    const checkboxRef = useRef(null);

    useEffect(() => {
        if (checkboxRef.current) {
            checkboxRef.current.indeterminate = partial;
        }
    }, [partial]);

    const submit = e => {
        e.preventDefault();
        const name = text.trim();
        if (name) onAdd(name);
        setText("");
    };

    return (
        <fieldset>
            <form onSubmit={submit}>
                <input value={text} onChange={e => setText(e.target.value)} />
                <button type="submit">Add</button>
            </form>

            <div className="selectAllBox">
                <input
                    type="checkbox"
                    checked={allChecked}
                    ref={checkboxRef}
                    onChange={e => onCheckAll(e.target.checked)}
                />
                <label>{numSelected} / {items.length} Selected</label>
            </div>

            <ul>
                {items.map((item, idx) => (
                    <li key={item.id} className="item">
                        <input
                            type="checkbox"
                            checked={item.checked}
                            onChange={() => onToggle(idx)}
                        />
                        {item.name}
                    </li>
                ))}
            </ul>
        </fieldset>
    );
}
