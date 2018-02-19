import React from 'react';
import Header from './components/Header';
import Loading from './components/Loading';
import firebase from 'firebase';
import Projects from './components/Projects';
import Databasetest from './components/Databasetest';
import CountTask from './components/CountTask';
import Login from './pages/Login';
import Graphic from './components/Graphic';
import ChartBar from './components/ChartBar';
import {reactLocalStorage} from 'reactjs-localstorage';

class App extends React.Component {
	constructor (props) {
		super (props);

		this.handleLogout = this.handleLogout.bind(this);
		this.handleInputProject = this.handleInputProject.bind(this)
		this.handleInputTask = this.handleInputTask.bind(this);

		this.state = {
			user: null,
			logged: false,
			inputProject: '',
			projects: [],
			// idProject: '',
			tasks: [],
			inputTask: '',
		}
	}

	componentWillMount() {
		firebase.auth().onAuthStateChanged(user => {
			this.setState({
				user: user
			});
			console.log('El user es:');
			console.log(this.state.user);
		});
		firebase.database().ref('projects').on('child_added', snapshot => {
			this.setState ({
				projects: this.state.projects.concat(snapshot.val()),
			});
			// console.log(this.state.projects);
			// console.log(`Este es el listado de los keys de los proyectos ${snapshot.key}`);
		})
		firebase.database().ref('tasks').on('child_added', snapshot => {
			this.setState({
				tasks: this.state.tasks.concat(snapshot.val())
			});
			console.log(this.state.tasks);
		});
		reactLocalStorage.set('var', true);
		reactLocalStorage.get('var', true);
		reactLocalStorage.setObject('var', {'test': 'test'});
		reactLocalStorage.getObject('var');
	}

	setUser() {
		this.setState({
			logged:true
		});
	}

	handleLogout () {
		firebase.auth().signOut()
		.then(result => console.log(`${result.user.email} ha salido`))
		.catch(error => console.log(`Error ${error.code}:${error.message}`));
	}

	handleInputProject (event) {
		this.setState ({
			inputProject: event.target.value
		})
		console.log(this.state.inputProject);
	}

	//transformamos el valor añadido en el input en el estado que se va a usar luego (inputTask)
	handleInputTask(e) {
		this.setState({
			inputTask: e.target.value
		});
	}

  render() {
		if(this.state.user) {

			return (
      <div className="App">
<<<<<<< HEAD
				<Header displayName={this.state.user.displayName}
				name={this.state.user.name}
				url={this.state.user.photoURL}
				onClick={this.handleLogout} />
      	{/* <Loading /> */}
				{/* <Login
					// renderLoginButton={this.renderLoginButton()}
					handleAuthGoogle = {this.handleAuthGoogle}
				/> */}
				<Timer />
				<Counter user={this.state.user} />
				<Projects inputProject={this.state.inputProject} handleInputProject={this.handleInputProject}
				projects={this.state.projects} />
				<Task
					inputTask={this.state.inputTask} handleInputTask={this.handleInputTask}
					tasks={this.state.tasks}
					user={this.state.user}
					projects={this.state.projects}/>
				<CountTask
					user={this.state.user}
					inputTask={this.state.inputTask}
					handleInputTask={this.handleInputTask}
					tasks={this.state.tasks}
					handleInputProject={this.handleInputProject}
					inputProject={this.state.inputProject}
				/>
				<Projects
					user={this.state.user}
					inputProject={this.state.inputProject} handleInputProject={this.handleInputProject}
					projects={this.state.projects} />
>>>>>>> 3def0b512f0aa1163b7ae6407e5f1af910bc1b16
				{/* <input type="date"></input> */}
        <Databasetest />
				<input className="calendar" type="date"></input>
				<Graphic />
				<ChartBar selectProjects={this.state.projects} />
      </div>
			);
			}
		console.log('Loguéate');
		return (<Login
			onLoginSuccess = {this.setUser}
			handleAuthGoogle = {this.handleAuthGoogle}/>)
  }
}

export default App;
