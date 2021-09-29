import { Component } from 'react';
import { getFeedbacks } from '../api/feedback';

class Feedback extends Component {
	render() {
		return (
			<ul>
				{this.props.feedbacks.map((item) => (
					<li key={item.id}>{item.feedback}</li>
				))}
			</ul>
		);
	}
}

export default Feedback;

export const getStaticProps = async () => {
	const feedbacks = await getFeedbacks();
	return {
		props: {
			feedbacks,
		},
	};
};
