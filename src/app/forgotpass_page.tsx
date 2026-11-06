import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
    useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const { height } = useWindowDimensions();

    const handleSendCode = () => {
        const normalizedEmail = email.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
            Alert.alert('Check your email', 'Enter a valid email address to continue.');
            return;
        }

        Alert.alert(
            'Password reset unavailable',
            'Email code delivery has not been set up yet.',
        );
    };

    return (
        <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidingView}
            >
                <ScrollView
                    bounces={false}
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <ImageBackground
                        accessibilityLabel="Hiker walking through a mountain valley"
                        imageStyle={styles.heroImage}
                        resizeMode="cover"
                        source={require('../../assets/images/fpasspic.png')}
                        style={[styles.hero, { height: Math.min(height * 0.6, 480) }]}
                    >
                        <Pressable
                            accessibilityLabel="Go back to login"
                            accessibilityRole="button"
                            onPress={() => router.back()}
                            style={styles.backButton}
                        >
                            <Image
                                resizeMode="contain"
                                source={require('../../assets/images/icons8-arrow-left-50.png')}
                                style={styles.backIcon}
                            />
                        </Pressable>
                        <LinearGradient
                            colors={['transparent', 'rgba(0, 0, 0, 0.96)']}
                            locations={[0.34, 1]}
                            style={styles.heroGradient}
                        />
                        <View style={styles.heroCopy}>
                            <Text style={styles.title}>Forgot password?</Text>
                            <Text style={styles.description}>
                                No worries, it happens! Just enter the email
                                {'\n'}address associated with your account.
                            </Text>
                        </View>
                    </ImageBackground>

                    <View style={styles.content}>
                        <View style={styles.emailField}>
                            <View style={styles.emailIconContainer}>
                                <Image
                                    accessibilityIgnoresInvertColors
                                    resizeMode="contain"
                                    source={require('../../assets/images/tabIcons/icons8-email-96.png')}
                                    style={styles.emailIcon}
                                />
                            </View>
                            <TextInput
                                accessibilityLabel="Enter your email"
                                autoCapitalize="none"
                                autoComplete="email"
                                keyboardType="email-address"
                                onChangeText={setEmail}
                                onSubmitEditing={handleSendCode}
                                placeholder="Enter your email"
                                placeholderTextColor="#929292"
                                returnKeyType="done"
                                style={styles.emailInput}
                                value={email}
                            />
                        </View>

                        <Pressable
                            accessibilityRole="button"
                            onPress={handleSendCode}
                            style={({ pressed }) => [
                                styles.sendButton,
                                pressed && styles.sendButtonPressed,
                            ]}
                        >
                            <Text style={styles.sendButtonText}>SEND CODE</Text>
                        </Pressable>

                        <View style={styles.footer}>
                            <View style={styles.divider} />
                            <View style={styles.loginPrompt}>
                                <Text style={styles.promptText}>Remember password?</Text>
                                <Pressable
                                    accessibilityRole="button"
                                    onPress={() => router.replace('/login_page')}
                                    hitSlop={8}
                                >
                                    <Text style={styles.loginLink}>Log in</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ForgotPasswordPage;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#000000',
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 20,
        backgroundColor: '#000000',
    },
    hero: {
        width: '100%',
        justifyContent: 'flex-end',
        overflow: 'hidden',
        paddingHorizontal: 15,
        paddingTop: 4,
    },
    heroImage: {
        marginHorizontal: 15,
        marginTop: 4,
        borderRadius: 28,
    },
    heroGradient: {
        ...StyleSheet.absoluteFill,
        borderRadius: 28,
        marginHorizontal: 15,
        marginTop: 4,
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 30,
        zIndex: 1,
        width: 34,
        height: 34,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 17,
        backgroundColor: 'rgba(255, 255, 255, 0.72)',
    },
    backIcon: {
        width: 20,
        height: 20,
        tintColor: '#111111',
    },
    heroCopy: {
        marginBottom: 12,
        paddingHorizontal: 10,
    },
    title: {
        marginBottom: 12,
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '700',
    },
    description: {
        color: '#C4C4C4',
        fontSize: 13,
        lineHeight: 18,
    },
    content: {
        flex: 1,
        paddingHorizontal: 25,
        paddingTop: 24,
    },
    emailField: {
        height: 46,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 6,
        backgroundColor: '#111111',
    },
    emailIconContainer: {
        width: 46,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: StyleSheet.hairlineWidth,
        borderRightColor: '#393939',
    },
    emailIcon: {
        width: 19,
        height: 19,
        tintColor: '#FFFFFF',
    },
    emailInput: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 10,
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },
    sendButton: {
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        marginTop: 36,
        backgroundColor: '#19F000',
    },
    sendButtonPressed: {
        opacity: 0.78,
    },
    sendButtonText: {
        color: '#000000',
        fontSize: 20,
        fontWeight: '900',
        letterSpacing: -0.5,
    },
    footer: {
        marginTop: 20,
    },
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#FFFFFF',
    },
    loginPrompt: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        marginTop: 21,
    },
    promptText: {
        color: '#A8A8A8',
        fontSize: 12,
        fontWeight: '600',
    },
    loginLink: {
        color: '#19F000',
        fontSize: 12,
        fontWeight: '700',
    },
});