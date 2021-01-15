import React from 'react';
import './ServiceProviderHome.scss';

class ServiceProviderHome extends React.Component {
	changeView = (e) => {
		const view = e.currentTarget.id;
		this.props.history.push(`/${view}`);
	};

	render() {
		return (
			<div className="ServiceHome mx-auto">
				<div className="serviceHomeLinksContainer">
					<div className="serviceHomeLinkCard card shadow-pop-br">
						<div className="serviceAppList grow">
							<div id="serviceapplist" onClick={this.changeView}>
								<div className="">
									<i className="fas fa-5x fa-calendar-alt" />
									<div className="m-3">
										<h3>Appointment List</h3>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="serviceHomeLinkCard card shadow-pop-br">
						<div className="messages grow">
							<div id="messages" onClick={this.changeView}>
								<i className="fas fa-5x fa-comments" />
								<div className="m-3">
									<h3>Messages</h3>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ServiceProviderHome;
