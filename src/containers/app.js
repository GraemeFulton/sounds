import React, { Component } from 'react';
import Countdown from 'react-count-down'
import ReactPlayer from 'react-player'
import SoundCloud from 'react-soundcloud-widget';
import { Timeline } from 'react-twitter-widgets';

import { connect } from 'react-redux';
import { loadApp } from 'actions/app';
import styles from './app.css';


let d = new Date();
d.setTime(d.getTime());
d.setHours(24, 0, 0, 0);


const OPTIONS = { endDate: d, prefix: 'for our next pick!' }

type Props = {
  dispatch: () => void,
  loaded: boolean,
  sound: String
}

export class AppContainer extends Component {
  static propTypes = {
    sound: React.PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.setSound = this.setSound.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(loadApp());
    this.state = {
      sound: 'https://www.youtube.com/watch?v=9h94cOlXFRc',
      title: 'Loading'
    };
  }

  setSound() {
    setTimeout(function () {
      const sound = (document.getElementById('twitter-widget-0').contentWindow.document.body.getElementsByClassName('link')[0].getAttribute('data-expanded-url'));
      this.setState({ sound });
      const title = (document.getElementById('twitter-widget-0').contentWindow.document.body.getElementsByClassName('timeline-Tweet-text')[0].innerHTML);
      const m = title.split('<', 1)[0];
      this.setState({ title:m });
    }.bind(this), 20).bind(this)
  }

  props: Props;

  render() {
    if (!this.props.loaded) {
      return null;
    }

    return (
      <div className={'row'} style={{ height: '110vh' }}>
        <section className={'col-sm-12 text-center container'} style={{ color: '#999' }}>
          <div style={{ marginBottom: '10px', marginTop: '20px', fontFamily: 'Euphoria Script, cursive' }}>
            <p>ASMR.SH</p>
          </div>
          <section className={'col-sm-6'} style={{ margin: '0 auto', padding: '0px', marginTop: '30px', opacity: '0.3', width: '516px' }}>
            <ReactPlayer url={this.state.sound} playing height="290" width="516" />
          </section>
          <div style={{ margin: '0px auto', padding: '12px', marginTop: '30px', position: 'relative' }}>
            <h1 style={{ fontFamily: 'Euphoria Script, cursive' }}>Playing Today:&nbsp;
              <a rel="noopener noreferrer" target="_blank" style={{ textDecoration: 'underline', color: '#999' }} href={this.state.sound}>{this.state.title}</a>
            </h1>
            <h2 className={'col-xs-12'} style={{ fontFamily: 'Taviraj, serif', fontSize: '1.2rem', margin: '4px auto', display: 'inline-block' }}>
              <span className={'prefix'} style={{ display: 'inline-block' }}>Come back</span> <span style={{ display: 'inline-block' }}>in&nbsp;</span>
              <div style={{ display: 'inline-block' }}>
                <Countdown options={OPTIONS} />
              </div>
            </h2>
            <p style={{ width: '50px', margin: '10px auto' }}><a target="_blank" href="https://twitter.com/intent/tweet?text=Come%and%20listen%20to%20sounds%20on%20@ASMRSH1">
              <img alt="tweet" style={{ width: '30px', opacity: '0.5' }} src="http://eglx.ca/wp-content/uploads/2016/01/Twitter-icon.png" /></a></p>
          </div>
          <section className={'col-sm-6'} style={{ margin: '0 auto', display: 'none' }}>
            <Timeline
              dataSource={{
                sourceType: 'profile',
                screenName: 'asmrsh1'
              }}
              options={{
                username: 'asmrsh1',
                height: '400'
              }}
              onLoad={() => this.setSound()}
            />
          </section>

          <div className={'col-sm-6 col-sm-offset-6 shadow'} style={{ margin: '0px auto', left: '50%', transform: 'translate(-50%, 0)', background: 'rgba(13,8,42,0.6)', borderRadius: '6px', padding: '0px', position: 'fixed', bottom: '0px', borderBottomLeftRadius: '0px', borderBottomRightRadius: '0px' }}>
            <div id="mc_embed_signup">
              <form style={{ color: '#999' }} action="//asmr.us16.list-manage.com/subscribe/post?u=d8b01ee10bb4c297f025a9729&amp;id=3d0223a8f6" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
                <div id="mc_embed_signup_scroll">
                  <label htmlFor="mce-EMAIL">🎙 Get the weekly playlist</label>
                  <input type="email" name="EMAIL" className="email" id="mce-EMAIL" placeholder="Enter email address (and listen to your keyboard)" required style={{ background: '#111', color: '#999', borderColor: '#220045' }} />
                  <div style={{ position: 'absolute', left: '-5000px' }} ariaHidden="true">
                    <input type="text" name="b_d8b01ee10bb4c297f025a9729_3d0223a8f6" tabIndex="-1" />
                  </div>
                  <div className="clear">
                    <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button" style={{ color: '#999', backgroundColor: '#290b6c', marginLeft: '8px' }} />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

function mapStateToProperties(state) {
  return {
    loaded: state.app.loaded,
    sound: state.app.sound,
    title: state.app.title
  };
}

export default connect(mapStateToProperties)(AppContainer);
