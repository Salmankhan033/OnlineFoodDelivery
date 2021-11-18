import React, { useState, useEffect } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  UselessTextInput,
  Button,
} from 'react-native'
import StarRating from 'react-native-star-rating'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { useUser } from '../Context/UserContext'
export default function Rating({ route }) {
  //var starCount = 2;
  const [starCount, setStarCount] = useState(0)
  const [Comment, setComment] = useState('default')
  const { ipAddress } = useUser()
  const onStarRatingPress = (rating) => {
    setStarCount(rating)
  }
  return (
    <View style={styles.container}>
      <View style={styles.reviewContainer}>
        <Text style={styles.title}>Customer reviews</Text>
        <View style={styles.totalWrap}>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={starCount}
            fullStarColor={'gold'}
            emptyStarColor={'black'}
            selectedStar={(rating) => onStarRatingPress(rating)}
          />
        </View>
        <Text style={styles.textStyle}>
          {/*To show the rating selected*/}
          {starCount} / 5
        </Text>
        <Button title="Submit" color="#008b8b" onPress={() => updateRating()} />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalWrap: {
    marginTop: 20,
    marginBottom: 5,
    backgroundColor: '#F5F8FF',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  reviewContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 40,
    minWidth: '80%',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1.0,
    shadowRadius: 2,
    shadowColor: 'rgba(193, 211, 251, 0.5)',
    elevation: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#323357',
    textAlign: 'center',
  },
})
