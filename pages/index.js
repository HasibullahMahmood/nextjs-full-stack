import { Component, createRef } from 'react';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.emailInputRef = createRef();
		this.feedbackInputRef = createRef();
	}

	state = {
		feedbacks: [],
	};

	submitHandler = async (event) => {
		event.preventDefault();
		const email = this.emailInputRef.current.value;
		const feedback = this.feedbackInputRef.current.value;

		const response = await fetch(`/api/feedback`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, feedback }),
		});

		console.log(response);
	};

	loadFeedbacksHandler = async () => {
		const response = await fetch(`/api/feedback`);
		const data = await response.json();

		this.setState({ feedbacks: data.dbResult });
	};

	render() {
		return (
			<div className="center">
				<h1>The Home Page</h1>
				<div>
					<form onSubmit={this.submitHandler}>
						<div>
							<label htmlFor="email">Your Email Address</label>
							<input type="text" id="email" ref={this.emailInputRef} />
						</div>
						<div>
							<label htmlFor="feedback">Your Feedback</label>
							<textarea id="feedback" rows="5" ref={this.feedbackInputRef}></textarea>
						</div>
						<button>Submit</button>
					</form>
					<br />
					<button onClick={this.loadFeedbacksHandler}>Load Feedbacks</button>
					<ul>
						{this.state.feedbacks.map((item) => (
							<li key={item.id}>{item.feedback}</li>
						))}
					</ul>
				</div>
			</div>
		);
	}
}
