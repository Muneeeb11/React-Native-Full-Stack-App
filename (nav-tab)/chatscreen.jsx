import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat, Bubble, Send, InputToolbar } from 'react-native-gifted-chat';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { icons } from '../constants';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

  const predefinedReplies = [
    'How are you?',
    'What are you doing?',
    'Welcome to the chat app!',
    'Nice to meet you!',
    'Hope you are having a great day!',
    'Let\'s talk!',
    'What\'s on your mind?',
    'How can I help you today?',
    'Tell me more!'
  ];

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));

    const randomReply = predefinedReplies[Math.floor(Math.random() * predefinedReplies.length)];
    const replyMessage = {
      _id: Math.floor(Math.random() * 1000000), // Generate a random ID for the reply message
      text: randomReply,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
    };

    setTimeout(() => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, [replyMessage]));
    }, 1000); // Delay the reply by 1 second
  }, []);

  const handleChooseImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (!response.didCancel && !response.error && response.assets.length > 0) {
        const image = response.assets[0].uri;
        const newMessage = {
          _id: Math.random().toString(36).substring(7),
          image,
          createdAt: new Date(),
          user: {
            _id: 1,
          },
        };
        setMessages(previousMessages => GiftedChat.append(previousMessages, [newMessage]));
      }
    });
  };

  const renderSend = props => {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <Image source={icons.send}
            resizeMode='contain'
            tintColor='white'
            style={{ width: 25, height: 40 }}
          />
        </View>
      </Send>
    );
  };

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#FFA001',
          },
          left: {
            backgroundColor: '#f0f0f0',
            marginLeft: -32, // Remove gap on the left bubble
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
            fontFamily: 'Poppins-Medium.ttf'
          },
          left: {
            color: 'black',
            fontFamily: 'Poppins-Medium.ttf'
          }
        }}
      />
    );
  };

  const renderInputToolbar = props => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: '#161622', // Match text field background color to main background
          borderTopColor: 'white',
          marginTop: 5
        }}
        textInputStyle={{ color: 'white' }} // Set text color to white
      />
    );
  };

  const renderActions = props => {
    return (
      <TouchableOpacity onPress={handleChooseImage}>
        <Image
          source={icons.image}
          resizeMode='contain'
          tintColor='white'
          style={{ width: 25, height: 45, marginLeft: 6}}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderBubble={renderBubble}
        renderSend={renderSend}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderActions} // Add this line
        alwaysShowSend
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161622',
  },
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 5,
  },
});

export default ChatScreen;
