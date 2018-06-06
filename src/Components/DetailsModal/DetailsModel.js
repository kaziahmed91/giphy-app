import React from 'react';
import classes from './DetailsModal.scss';
import likeBtn from '../../Assets/like.png';
import likeRedBtn from '../../Assets/like_red.png';


class DetailsModal extends React.Component {

    // static propTypes = {
    //     isModalOpen: React.PropTypes.bool.isRequired,
    //     closeModal: React.PropTypes.func.isRequired,
    //     style: React.PropTypes.shape({
    //         modal: React.PropTypes.object,
    //         overlay: React.PropTypes.object
    //     })
    // };

    render() {
        return (
        <div className={classes.outerStyle} style={{ display: this.props.isModalOpen ? 'block' : 'none' }}>
            <div className={classes.overlay} onClick={this.props.closeModal}></div>
            <div onClick={this.props.closeModal}></div>
            <div className={classes.modal} >
                {this.props.children}
                <div className={classes.likeBtn+' '+classes.pulse}>
                    <img src={likeBtn} alt="like"
                        onMouseEnter={e => (e.currentTarget.src = likeRedBtn)}
                        onMouseLeave={e => (e.currentTarget.src = likeBtn)}
                    />
                </div>
            </div>
        </div>
        )
    }
}
export default DetailsModal;
