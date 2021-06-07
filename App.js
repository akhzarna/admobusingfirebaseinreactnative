/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{ Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


import admob, { MaxAdContentRating, InterstitialAd, AdEventType, RewardedAd, RewardedAdEventType, BannerAd, TestIds, BannerAdSize,AdMobRewarded } from '@react-native-firebase/admob';


class App extends Component {

  constructor(props){
    super(props);
    this.state={

        }
  }

  componentDidMount(){

    // Compulsory
    admob()
    .setRequestConfiguration({
      // Update all future requests suitable for parental guidance
      maxAdContentRating: MaxAdContentRating.PG,

      // Indicates that you want your content treated as child-directed for purposes of COPPA.
      tagForChildDirectedTreatment: true,

      // Indicates that you want the ad request to be handled in a
      // manner suitable for users under the age of consent.
      tagForUnderAgeOfConsent: true,
    })
    .then(() => {
      // Request config successfully set!
    });
    // ......





    // this.showInterstitialAd();
    this.showRewardedAd();




    // <PublisherBanner
    //   adSize="fullBanner"
    //   adUnitID="your-admob-unit-id"
    //   testDevices={[PublisherBanner.simulatorId]}
    //   onAdFailedToLoad={error => console.error(error)}
    //   onAppEvent={event => console.log(event.name, event.info)}
    // />

    // Display a rewarded ad
    // AdMobRewarded.setAdUnitID('ca-app-pub-9152919921144751/4388798738');
    // AdMobRewarded.requestAd().then(() => AdMobRewarded.showAd());



  PushNotification.configure({
            // (optional) Called when Token is generated (iOS and Android)
            onRegister: function(token) {
              console.log("TOKEN:", token);
            },
          
            // (required) Called when a remote or local notification is opened or received
            onNotification: function(notification) {
              console.log("NOTIFICATION:", notification);
          
              // process the notification here
          
              // required on iOS only 
              notification.finish(PushNotificationIOS.FetchResult.NoData);
            },
            // Android only
            senderID: "1090501687137",
            // iOS only
            permissions: {
              alert: true,
              badge: true,
              sound: true
            },
            popInitialNotification: true,
            requestPermissions: true
          });

          
  }

  showInterstitialAd = () => {

    // Create a new instance
    const interstitialAd = InterstitialAd.createForAdRequest('ca-app-pub-9152919921144751/8982703763');
    // Add event handlers
    interstitialAd.onAdEvent((type, error) => {
        if (type === AdEventType.LOADED) {
            interstitialAd.show();
        }
    });
    // Load a new advert
    interstitialAd.load();

  }

  showRewardedAd = () =>{
    //  // Create a new instance
    //  const myRewardedAd = RewardedAd.createForAdRequest("ca-app-pub-9152919921144751/1128032966");
    //  // Add event handlers
    //  myRewardedAd.onAdEvent((type, error, reward) => {
    //      if (type === RewardedAdEventType.LOADED) {
    //       myRewardedAd.show();
    //      }

    //      if (type === RewardedAdEventType.EARNED_REWARD) {
    //       alert('Earned' + reward);
    //      }

    //  });
    //  // Load a new advert
    //  myRewardedAd.load();
    //  // Rewarded
    //  // RewardedAd.createForAdRequest(TestIds.REWARDED)


    // Create a new instance
    const rewardAd = RewardedAd.createForAdRequest("ca-app-pub-9152919921144751/1681856290",
      {requestNonPersonalizedAdsOnly:true,
      keywords:['fashion','clothing']}
    );
    // rewardAd
    // Add event handlers
    rewardAd.onAdEvent((type, error, reward) => {
        if (type === RewardedAdEventType.LOADED) {
            rewardAd.show();
        }

        if (type === RewardedAdEventType.EARNED_REWARD) {
            
            console.log('Rewards are = ',reward);
            
            // Alert.alert(
            //     'Reward Ad',
            //     'You just earned a reward of 5 lives',
            //     [
            //       {text: 'OK', onPress: () => console.log('OK Pressed')},
            //     ],
            //     { cancelable: true }
            //   )
        }
    });

    // Load a new advert
    rewardAd.load();
  }


  render(){

  return (

    <View style={{flex:0,marginTop:1,backgroundColor:'transparent',height:70,}}>
    <Text> Testing Ads Are Working </Text>
    
    <BannerAd size={BannerAdSize.SMART_BANNER}
              unitId={'ca-app-pub-9152919921144751/3203053032'}>
    </BannerAd>
     </View>

      );
    }
}

const styles=StyleSheet.create({

  headerStyle:{
  justifyContent:'center',
  width:window.width,
	},
  viewStyle:{
    height: 60,
    backgroundColor:'white',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },
  titleStyle:{
  fontWeight:'bold',
  color:  'white',    //'#2A3990',
  fontSize:18,
  fontFamily:'UrduTypesetting',
  },
  iconView:{
    flex:0.1,
    paddingRight:5,
  },
  textView:{
    flex:0.9,
    paddingLeft:10,
    alignItems:'center',
    justifyContent:'center',
  },
  notifyStyle:{
    flex:0.1,
    height:40,
    alignItems:'flex-start',
    justifyContent:'center',
  },
  iconStyle:{
    width:20,
    height:17,
  },
  buttonDimension:{
    alignItems:'center',
    justifyContent:'center',
    marginRight:8,
    width:40,
    height:40,
  },
  iconMenuDimension:{
    width:25,
    height:20,
  },
  buttonNotificationDimention:{
    alignItems:'center',
    justifyContent:'center',
    marginRight:10,
    width:40,
    height:40,
  },
  iconNotifyDimension:{
     width:30,
     height:25,
     marginRight:15,
     resizeMode: 'contain',
  },
  notifyheaderStyle:{
  justifyContent:'center',
  alignItems:'center',
  height: 120,
  },
});

export default App;
