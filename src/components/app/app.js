/* eslint-disable default-case */
import React from 'react';
import './app.css';

import AppHeader from '../app-header/app-header';
import SearchPanel from '../search-panel/search-panel';
import TodoList from '../todo-list/todo-list';
import ItemStatusFilter from '../item-status-filter/item-status-filter';
import AddListItem from "../add-list-item/add-list-item";
import './app.css';

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            todoData: [
                this.createTodoItem('DRink Coffee'),
                this.createTodoItem('Make Awesome App'),
                this.createTodoItem('Have a lunch')
            ],
            tern: '',
            filterItems: 'all'
        };
    }
    id = 1;

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.id++
        }
    }

    deleteItem = (id) => {
        this.setState(
            ({ todoData }) => {
                const index = todoData.findIndex((el) => el.id === id);
                const newState = [
                    ...todoData.slice(0, index),
                    ...todoData.slice(index + 1)
                ];
                return { todoData: newState }
            }
        );
    };
    addItem = (text) => {
        this.setState(({ todoData }) => {
            return {
                todoData: [
                    ...todoData,
                    this.createTodoItem(text)
                ]
            }
        })
    };
    toggleProp = (arr, id, propName) => {
        const index = arr.findIndex((el) => el.id === id),
            oldItem = arr[index],
            newItem = { ...oldItem, [propName]: !oldItem[propName] };
        return [
            ...arr.slice(0, index),
            newItem,
            ...arr.slice(index + 1)
        ];
    };
    labelClick = id => {
        this.setState(
            ({ todoData }) => {
                return { todoData: this.toggleProp(todoData, id, 'important') }
            });
    };
    buttonClick = id => {

        this.setState(
            ({ todoData }) => {
                return { todoData: this.toggleProp(todoData, id, 'done') }
            });
    };

    search(items, tern) {
        let tmp = items;
        switch (this.state.filterItems) {
            case 'done':
                tmp = items.filter(item => item.done);
                break;
            case 'active1':
                tmp = items.filter(item => !item.done);
                break;
            case 'important':
                tmp = items.filter(item => item.important);
                break;
        }
        if (!tern.length) return tmp;
        return tmp.filter(item => item.label.toLowerCase().indexOf(tern.toLowerCase()) > -1);// ищет подстроку в строке
    }
    searchChange = tern => {
        this.setState({ tern })
    };

    filterChange = filterItems => {
        this.setState({ filterItems })
    }
    render() {
        const { todoData, tern } = this.state,
            visibleItems = this.search(todoData, tern),
            doneCount = todoData.filter(el => el.done).length,
            todoCount = todoData.length - doneCount;
        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount} />
                <div className="top-panel d-flex">
                    <SearchPanel onSearchChange={this.searchChange} />
                    <ItemStatusFilter onFilterItemsChange={this.filterChange} />
                </div>

                <TodoList todos={visibleItems}
                    onDelete={id => {
                        this.deleteItem(id)
                    }}
                    onLabelClick={this.labelClick}
                    onButtonClick={this.buttonClick}
                />
                <AddListItem onAddListItem={this.addItem} />

            </div>
        );
    };
}