(function (){

var App = React.createClass({

	getInitialState () {
		return {
			itemList: [{name: 'Apple', type: 'Fruit'}, {name: 'Beef', type: 'Meat'}]
		}
	},

	handleListSubmit (newItem) {
		this.state.itemList.push(newItem);

		this.setState({
			itemList: this.state.itemList
		});
	},

	render () {
		return (
			<div>
				<h1>{this.props.title}</h1>
				<GroceryList items={this.state.itemList} />
				<ItemAdder onListSubmit={this.handleListSubmit} />
			</div>
		);
	}
});

var GroceryList = React.createClass({

	propTypes: {
		items: React.PropTypes.array.isRequired
	},

	buildList (){
		var list = this.props.items.map((item) => <li>{item.name} <em>{item.type}</em></li>);
		return list;
	},

	render () {
		return (
			<ul>{this.buildList()}</ul>
		);
	}
});

var ItemAdder = React.createClass({

	propTypes: {
		onListSubmit: React.PropTypes.func.isRequired
	},

	handleSubmit (e) {
		e.preventDefault();
		var name = this.refs.newItemName.getDOMNode().value;
		var type = this.refs.newItemType.getDOMNode().value;
		document.getElementById('itemAdder').reset();
		
		this.props.onListSubmit( {name: name, type: type} );
	},

	render () {
		return (
			<form onSubmit={this.handleSubmit} id="itemAdder">
				<input type="text" name="newItemName" ref="newItemName" />
				<select name="newItemType" ref="newItemType">
					<option>Choose a type</option>
					<option value="Fruit">Fruit</option>
					<option value="Meat">Meat</option>
				</select>
				<button>Ajouter</button>
			</form>
		);
	}
});

React.render(<App title="Liste d'épicerie" />, document.getElementById('app'));

})();