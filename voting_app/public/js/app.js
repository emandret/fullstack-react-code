class Product extends React.Component {

    constructor(props) {
        // Always call this first
        super(props);

        // Custom method bindings here for the onClick event
        this.handleUpVote = this.handleUpVote.bind(this);
    }

    handleUpVote() {
        this.props.onVote(this.props.id);
    }

    render() {
        const {
            title,
            description,
            url,
            votes,
            submitterAvatarUrl,
            productImageUrl,
        } = this.props;

        return (
            <div className="item">
                <div className="image">
                    <img src={productImageUrl} />
                </div>
                <div className="middle aligned content">
                    <div className="header">
                        <a>
                            <i onClick={this.handleUpVote} className="large caret up icon" />
                        </a>
                        {votes}
                    </div>
                    <div className="description">
                        <a href={url}>{title}</a>
                        <p>{description}</p>
                    </div>
                    <div className="extra">
                        <span>Submitted by: </span>
                        <img className="ui avatar image" src={submitterAvatarUrl} />
                    </div>
                </div>
            </div>
        );
    }
}

class ProductList extends React.Component {

    constructor(props) {
        super(props);

        // Set the state
        this.state = { products: [] };

        // Custom method bindings here for the onClick event
        this.handleProductUpVote = this.handleProductUpVote.bind(this);
    }

    componentDidMount() {
        this.setState({ products: Seed.products });
    }

    handleProductUpVote(productId) {
        const nextProducts = this.state.products.map((product) => {
            if (product.id === productId) {
                return Object.assign({}, product, {
                    votes: product.votes + 1,
                });
            } else {
                return product;
            }
        });

        // Enqueues changes to the component state and tells React that this component
        // and its children need to be re-rendered
        this.setState({ products: nextProducts });
    }

    render() {
        this.state.products.sort((a, b) => (
            b.votes - a.votes
        ));

        const productComponents = this.state.products.map((product) => (
            <Product
                key={product.id}
                id={product.id}
                title={product.title}
                description={product.description}
                url={product.url}
                votes={product.votes}
                submitterAvatarUrl={product.submitterAvatarUrl}
                productImageUrl={product.productImageUrl}
                onVote={this.handleProductUpVote}
            />
        ));

        return (
            <div className="ui unstackable items">
                {productComponents}
            </div>
        );
    }
}

ReactDOM.render(
    <ProductList />,
    document.getElementById("content"),
);
