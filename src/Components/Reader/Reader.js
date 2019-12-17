import React, { Component } from 'react';
import T from 'prop-types';
import styles from './Reader.module.css';
import Controls from '../Controls/Controls';
import Counter from '../Counter/Counter';
import Publication from '../Publication/Publication';

export default class Reader extends Component {
  static propTypes = {
    match: T.shape({
      url: T.string.isRequired,
    }).isRequired,
    location: T.shape({
      pathname: T.string.isRequired,
      search: T.string.isRequired,
      state: T.object,
    }).isRequired,
    history: T.shape({
      push: T.func.isRequired,
      replace: T.func.isRequired,
    }).isRequired,
    items: T.arrayOf(
      T.shape({
        id: T.string.isRequired,
        title: T.string.isRequired,
        text: T.string.isRequired,
      }).isRequired,
    ),
  };

  static defaultProps = {
    items: [],
  };

  componentDidMount() {
    const { location, history, items } = this.props;
    const index = Number(this.getIndexPublicationFromProps(this.props));
    const publicationQuantity = items.reduce(
      (acc, item) => 1 + items.indexOf(item),
      0,
    );

    if (!index || index > publicationQuantity || index < 1) {
      history.replace({
        pathname: location.pathname,
        search: `item=1`,
      });
    }
  }

  getIndexPublicationFromProps = props =>
    new URLSearchParams(props.location.search).get('item');

  onDecrementPublication = () => {
    const indexPublication = Number(
      this.getIndexPublicationFromProps(this.props),
    );
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: `item=${indexPublication - 1}`,
    });
  };

  onIncrementPublication = () => {
    const indexPublication = Number(
      this.getIndexPublicationFromProps(this.props),
    );
    this.props.history.push({
      pathname: this.props.location.pathname,
      search: `item=${indexPublication + 1}`,
    });
  };

  render() {
    const { items } = this.props;
    const publicationQuantity = items.reduce(
      (acc, item) => 1 + items.indexOf(item),
      0,
    );
    const index = Number(this.getIndexPublicationFromProps(this.props));
    const item = items[index - 1];

    return (
      <div className={styles.reader}>
        <Controls
          onDecrement={this.onDecrementPublication}
          onIncrement={this.onIncrementPublication}
          indexPublication={index}
          publicationQuantity={publicationQuantity}
        />
        <Counter
          indexPublication={index}
          publicationQuantity={publicationQuantity}
        />
        {item && <Publication publication={item} indexPublication={index} />}
      </div>
    );
  }
}
