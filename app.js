'use strict';

(function () {

	var App = React.createClass({
		displayName: 'App',

		getInitialState: function getInitialState() {
			return {
				itemList: [{ name: 'Apple', type: 'Fruit' }, { name: 'Beef', type: 'Meat' }]
			};
		},

		handleListSubmit: function handleListSubmit(newItem) {
			this.state.itemList.push(newItem);

			this.setState({
				itemList: this.state.itemList
			});
		},

		render: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					'h1',
					null,
					this.props.title
				),
				React.createElement(GroceryList, { items: this.state.itemList }),
				React.createElement(ItemAdder, { onListSubmit: this.handleListSubmit })
			);
		}
	});

	var GroceryList = React.createClass({
		displayName: 'GroceryList',

		propTypes: {
			items: React.PropTypes.array.isRequired
		},

		buildList: function buildList() {
			var list = this.props.items.map(function (item) {
				return React.createElement(
					'li',
					null,
					item.name,
					' ',
					React.createElement(
						'em',
						null,
						item.type
					)
				);
			});
			return list;
		},

		render: function render() {
			return React.createElement(
				'ul',
				null,
				this.buildList()
			);
		}
	});

	var ItemAdder = React.createClass({
		displayName: 'ItemAdder',

		propTypes: {
			onListSubmit: React.PropTypes.func.isRequired
		},

		handleSubmit: function handleSubmit(e) {
			e.preventDefault();
			var name = this.refs.newItemName.getDOMNode().value;
			var type = this.refs.newItemType.getDOMNode().value;
			document.getElementById('itemAdder').reset();

			this.props.onListSubmit({ name: name, type: type });
		},

		render: function render() {
			return React.createElement(
				'form',
				{ onSubmit: this.handleSubmit, id: 'itemAdder' },
				React.createElement('input', { type: 'text', name: 'newItemName', ref: 'newItemName' }),
				React.createElement(
					'select',
					{ name: 'newItemType', ref: 'newItemType' },
					React.createElement(
						'option',
						null,
						'Choose a type'
					),
					React.createElement(
						'option',
						{ value: 'Fruit' },
						'Fruit'
					),
					React.createElement(
						'option',
						{ value: 'Meat' },
						'Meat'
					)
				),
				React.createElement(
					'button',
					null,
					'Ajouter'
				)
			);
		}
	});

	React.render(React.createElement(App, { title: 'Liste d\'épicerie' }), document.getElementById('app'));
})();
//# sourceMappingURL=app.js.map