import React from 'react';
import { Chart } from 'primereact/components/chart/Chart';

class ChartBar extends React.Component {

	constructor(props) {
		super(props)
		this.selectProject = this.selectProject.bind(this);
		this.handleFilteredProject = this.handleFilteredProject.bind(this);
		this.state = {
			projectsFiltered: '',
			taskData: '',
			projectName: 'Project'
		}
	}
	handleFilteredProject (event) {
		let projectsFiltered = event.currentTarget.value;

		let filteredTasks = this.props.filterTaskSelect.filter(filterTask =>
		filterTask.projectId.includes(projectsFiltered));
		console.log(filteredTasks);

		let namestasles = filteredTasks.map(element => element.taskName);
		let counters = filteredTasks.map(element => element.counter);

		let arrayProject = this.props.selectProjects;
		let projectSelected = arrayProject.filter(project => project.projectId.includes(projectsFiltered));

		if(projectSelected.length == 0){
			this.setState({
				taskData: data,
				projectName: 'Project'
			})
		}
		else {
			this.setState({
				taskData: data,
				projectName: projectSelected[0].projectName
			})
		}

		let data = {
			labels: namestasles,
			datasets: [
				{
					label: 'Time',
					backgroundColor: '#F5BF2E',
					borderColor: '#000000',
					data: counters
				},
			]
		};

		this.setState({
			taskData: data
		})
	}

	selectProject(){
		let arrayProject = this.props.selectProjects;

		return(<select className="add project__btn" onChange={this.handleFilteredProject}>
			<option>Select a Project</option>
			{
				arrayProject.map(
					project =>
						<option value={project.projectId}>{project.projectName}</option>
				)
			}
		</select>);
		}

	render() {
    return (
			<div>
				<div className="content-section introduction">
					<div className="feature-intro">
						<h1>{this.state.projectName}</h1>
						<p>Invested time of the tasks in a project</p>
					</div>
				</div>

				{ this.selectProject() }

				<div className="content-section implementation">
					<Chart  id="barras" type="bar" data={this.state.taskData} className="chartBar"/>
				</div>
			</div>
		)
	}
}

export default ChartBar;
