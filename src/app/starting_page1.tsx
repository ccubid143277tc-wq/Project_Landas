import { Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

    const StartingPage1 = () => {
        const router = useRouter();
    const [fontsloaded ] = useFonts({
        Poppins_700Bold,
    });
    if (!fontsloaded) {
        return null;
    }
    return (
        <View style = {styles.container}>
            <Text style = {styles.logo}>
                <Text style={{color: '#ffff'}}>LAN</Text>
                <Text style={{color: '#02af0b'}}>DAS</Text>
            </Text>

            <View style={styles.imageContainer}>
                <Image
                    source={require('../../assets/images/Starting_Page1.webp')}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="cover"
                    accessibilityLabel="Mountain landscape at sunrise"
                />
                <LinearGradient
                    colors={['transparent', 'rgba(0, 0, 0, 0.9)']}
                    locations={[0.4, 0.7]}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 0.7 }}
                    style={styles.gradient}
                />
            </View>
             <Text style = {styles.title}>
                Offline Maps, {'\n'} 
                Always Ready
             </Text>
             <Text style = {styles.description}>
                Download trail maps before you go. Landas{' \n'}
                works with zero signal - all your data syncs {'\n'}
                the moment you're back online.
             </Text>
             <Pressable 
                accessibilityRole="button"
                style={styles.button1}
                onPress={() => router.push('/starting_page')}
                >
                <Text style = {styles.buttonText1}>Back</Text>
             </Pressable>
             <Pressable 
                accessibilityRole="button"
                style={styles.button2}
                onPress={() => router.push('/starting_page2')}
                >
                <Text style = {styles.buttonText2}>Next</Text>
             </Pressable>
            
        </View>
    );
};

export default StartingPage1;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    logo: { 
        fontSize: 50,
        fontFamily: 'Poppins_700Bold',
        marginTop: 20,
        marginLeft: 20,

    },
    imageContainer: {
        flex: 1,
        marginTop: 0,
        marginHorizontal: 10,
        overflow: 'hidden',
        borderRadius: 40,
    },
    title: {
        flex: 1,
        fontSize: 30,
        color: '#ffffff',
        position: 'absolute',
        marginLeft : 25,
        bottom:300,
        
    },
    description: {
        flex: 1,
        fontSize: 15,
        position: 'absolute',
        bottom: 230,      
        textAlign: 'left',
        paddingHorizontal: 20,
        color: '#ffffff',
        marginLeft: 8,
       
    },
    gradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 40,
    },
    button1: {
        position: 'absolute',
        bottom: 50, 
        left: 20,
        backgroundColor: '#030303',
        paddingVertical: 10,
        paddingHorizontal: 50,
        borderRadius: 20,
        borderColor: '#02af0b',
        borderWidth: 2,
    },
    button2: {
        position: 'absolute',
        bottom: 50,
        right: 20,
        backgroundColor: '#02af0b',
        paddingVertical: 10,
        paddingHorizontal: 50,
        borderRadius: 20,
    },
    buttonText1: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonText2: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
       

    },
});
