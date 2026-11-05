import { Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';


const StartingPage = () => {

    const router = useRouter();

    const [fontsLoaded] = useFonts({
        Poppins_700Bold,
    });
    if (!fontsLoaded) {
        return null;
    }
    return (

       <View style={styles.container}>
        <ImageBackground
            source={require('../../assets/images/Starting_page.jpg')}
            style={styles.background}
            imageStyle={styles.image}
            resizeMode="cover"
            accessibilityLabel="Mountain landscape at sunrise"

        >
            <LinearGradient
                colors={['transparent', 'rgba(18, 18, 18, 0.9)']}
                locations={[0.4, 0.7]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.gradient}
            />
            <Text style={styles.logo}>
                <Text style ={{color: '#ffff'}}>LAN</Text>
                <Text style={{ color:'#02af0b'}}>DAS</Text>
            </Text>
            <Text style={styles.description}>
                Discover, track and share the {'  \n'}trails that define your adventure.
            </Text>
              </ImageBackground>
        <Pressable
            accessibilityRole="button"
            style={styles.button}
            onPress={() => router.push('/starting_page1')}
        >
            <Text style={styles.buttonText}>START YOUR HIKE</Text>
        </Pressable>
       </View>
       
       
    );
};

export default StartingPage;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    logo: {
        flex: 1,
        fontSize: 50,
        fontWeight: 'bold',
        fontFamily: 'Poppins_700Bold',
        position: 'absolute',
        bottom: 130,
        right: 140,
    },
    description: {
        flex: 1,
        position: 'absolute',
        bottom: 100,      
        right: 100,
        fontSize: 20,
        textAlign: 'center',
        paddingHorizontal: 20,
        color: '#ffffff',
    },
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        justifyContent: 'flex-end',
        padding: 5,
        
    },
    gradient: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        borderRadius: 10,
    },
    image:{
        borderRadius: 20,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 40,
        
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#019708',
        borderRadius: 20,
        marginBottom: 60,
        marginHorizontal: 24,
        padding: 14,
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 20,
        fontFamily: 'Poppins_700Bold',
    }

   });