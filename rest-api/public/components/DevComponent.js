var Devs = React.createClass({
    getInitialState: function() {
        return {
            devs: []
        };
    },
    render: function() {
        var devs = this.state.devs;
        devs = devs.map((dev, index) => {
            return (
                <li key={index}>
                    <span className={dev.laisvas ? 'free' : 'busy'}></span>
                    <span className="name">{dev.vardas}</span>
                    <span className="rank">{dev.tech.join(', ')}</span>
                    <span className="dist">{Math.floor(dev.distance / 1000)} km</span>
                <div className="btns">
                    <button className="edit-dev" onClick={() => this.handleEdit(dev._id)}>Edit</button>
                    <button className="delete-dev" onClick={() => this.handleDelete(dev._id)}>Delete</button>
                </div>
                </li>
                
                
            );
        });
        return (
            <div id="dev-container">
                <form id="search" onSubmit={this.handleSubmit}>
                    <label>Ilguma:</label>
                    <input type="number" ref="lng" placeholder="ilguma" required />
                    <label>Platuma:</label>
                    <input type="number" ref="lat" placeholder="platuma" required />
                    <input type="submit" value="Rasti programuotojus" />
                </form>
                <ul>{devs}</ul>
            </div>
        );
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var lng = this.refs.lng.value;
        var lat = this.refs.lat.value;

        fetch('/api/programuotojai/?lng=' + lng + '&lat=' + lat)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(json => {
                this.setState({
                    devs: json
                });
                console.log(json);
            })
            .catch(error => {
                console.error('Error during fetch:', error);
            });
    },
    handleDelete: async function(_id) {
        try {
            const res = await fetch(`/api/programuotojai/${_id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
            console.log(res);

            if (res.ok) {
                const updatedDevs = this.state.devs.filter(dev => dev._id !== _id);
                this.setState({
                    devs: updatedDevs
                });
                console.log("Developer deleted successfully!");
            }

            if (!res.ok) {
                throw new Error('Could not delete the developer');
            }
        } catch (err) {
            console.log(err);
        }
    },
    handleEdit: async function(_id) {        
        window.location.href = `/edit-dev/${_id}`;
    }
});
