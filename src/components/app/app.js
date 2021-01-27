// import js
import React, {Component} from 'react';
import AppHeader from '../app-header/app-header';
import SearchPanel from '../search-panel/search-panel';
import PostStatusFilter from '../post-status-filter/post-satus-filter';
import PostList from '../post-list/post-list';
import PostAddForm from '../post-add-form/post-add-form';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {label: 'Going to learn react', important: true, like: false, id: '1kivg'},
                {label: 'Going to learn webpack', important: false, like: false, id: '2hfuf'},
                {label: 'Going to learn babel', important: false, like: false, id: '3efet'},
            ],
            term: '',
            filter: 'all'
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLike = this.onToggleLike.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);

        this.maxId = 4;
    };

    deleteItem(id) {
        this.setState(({data}) => {
            const index = data.findIndex(el => el.id === id);
            const newData = [...data.slice(0, index), ...data.slice(index + 1)];
            return {
                data: newData
            }
        })
    };

    addItem(text) {
        const item = {
            label: text,
            important: false, 
            like: false,
            id: this.maxId++
        };
        this.setState(({data}) => {
            const newArr = [...data, item];
            return {
                data: newArr
            }
        })
    };

    onToggleImportant(id) {
        this.setState(({data}) => {
            const i = data.findIndex(el => el.id === id);
            const old = data[i];
            const newItem = {...old, important: !old.important};
            const newArr = [...data.slice(0, i), newItem, ...data.slice(i + 1)];
            return {
                data: newArr
            }
        })
    };

    onToggleLike(id) {
        this.setState(({data}) => {
            const i = data.findIndex(el => el.id === id);
            const old = data[i];
            const newItem = {...old, like: !old.like};
            const newArr = [...data.slice(0, i), newItem, ...data.slice(i + 1)];
            return {
                data: newArr
            }
        })
    };

    searchPosts(items, term) {
        if (term.length === 0) {
            return items
        };

        return items.filter( (item) => {
            return item.label.indexOf(term) > -1
        })
    };

    filterPosts(items, filter) {
        if (filter === 'like') {
            return items.filter(el => el.like);
        } else {
            return items;
        }
    }

    onUpdateSearch(term) {
        this.setState({term})
    };

    onFilterSelect(filter) {
        this.setState({filter})
    };

    render() {
        const {data, term, filter} = this.state;

        const liked = data.filter(item => item.like).length;
        const allPosts = data.length;

        const visiblePosts = this.filterPosts(this.searchPosts(data, term), filter) ;

        return (
            <div className="app">
                <AppHeader liked={liked} allPosts={allPosts} />
                <div className="search-panel d-flex">
                    <SearchPanel onUpdateSearch={text => this.onUpdateSearch(text)}/>
                    <PostStatusFilter filter={filter}
                        onFilterSelect={filter => this.onFilterSelect(filter)}
                    />
                </div>
                <PostList posts={visiblePosts} 
                    onDelete={ id => this.deleteItem(id)}
                    onToggleImportant={arg => this.onToggleImportant(arg)}
                    onToggleLike={arg => this.onToggleLike(arg)}
                />
                <PostAddForm onAdd={ tex => this.addItem(tex)}/>
            </div>
        )
    }
    
}

