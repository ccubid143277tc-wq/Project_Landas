import { Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import {
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

type FieldIcon = 'user' | 'email' | 'lock';

const fieldIcons = {
    user: require('../../assets/images/tabIcons/icons8-user-96.png'),
    email: require('../../assets/images/tabIcons/icons8-email-96.png'),
    lock: require('../../assets/images/tabIcons/icons8-lock-96.png'),
} as const;

const eyeIcons = {
    open: require('../../assets/images/tabIcons/icons8-eye-96.png'),
    closed: require('../../assets/images/tabIcons/icons8-eye-96 (1).png'),
};

const socialIcons = {
    facebook: require('../../assets/images/tabIcons/icons8-facebook-96.png'),
    google: require('../../assets/images/tabIcons/icons8-google-96.png'),
};

type FormFieldProps = {
    icon: FieldIcon;
    placeholder: string;
    secureTextEntry?: boolean;
    keyboardType?: 'default' | 'email-address';
};

const FormField = ({
    icon,
    placeholder,
    secureTextEntry = false,
    keyboardType = 'default',
}: FormFieldProps) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const isPassword = secureTextEntry;

    return (
        <View style={styles.field}>
            <View style={styles.fieldIcon}>
                <Image
                    resizeMode="contain"
                    source={fieldIcons[icon]}
                    style={styles.fieldIconImage}
                />
            </View>
            <TextInput
                accessibilityLabel={placeholder}
                autoCapitalize={keyboardType === 'email-address' ? 'none' : 'sentences'}
                keyboardType={keyboardType}
                placeholder={placeholder}
                placeholderTextColor="#929292"
                secureTextEntry={isPassword && !passwordVisible}
                style={styles.input}
            />
            {isPassword && (
                <Pressable
                    accessibilityLabel={passwordVisible ? 'Hide password' : 'Show password'}
                    accessibilityRole="button"
                    onPress={() => setPasswordVisible(!passwordVisible)}
                    style={styles.visibilityButton}
                >
                    <Image
                        resizeMode="contain"
                        source={passwordVisible ? eyeIcons.closed : eyeIcons.open}
                        style={styles.visibilityIcon}
                    />
                </Pressable>
            )}
        </View>
    );
};

const LoginPage = () => {
    const [fontsLoaded] = useFonts({ Poppins_700Bold });
    const [isSignUp, setIsSignUp] = useState(false);
    const { height } = useWindowDimensions();

    if (!fontsLoaded) {
        return null;
    }

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
                    style={styles.scrollView}
                >
                    <View style={[styles.hero, { height: Math.min(height * 0.41, 370) }]}>
                        <ImageBackground
                            accessibilityLabel="Sunrise over a mountain landscape"
                            imageStyle={styles.heroImage}
                            resizeMode="cover"
                            source={require('../../assets/images/login.jpg')}
                            style={styles.heroImageBackground}
                        >
                            <Pressable
                                accessibilityLabel="Go back"
                                accessibilityRole="button"
                                onPress={() => router.push('/starting_page3')}
                                style={styles.backButton}
                            >
                                <Image
                                    resizeMode="contain"
                                    source={require('../../assets/images/icons8-arrow-left-50.png')}
                                    style={styles.backIcon}
                                />
                            </Pressable>
                            <LinearGradient
                                colors={['transparent', 'rgba(0, 0, 0, 0.92)']}
                                locations={[0.38, 1]}
                                style={styles.heroGradient}
                            />
                            <Text style={styles.logo}>
                                <Text style={styles.logoWhite}>LAN</Text>
                                <Text style={styles.logoGreen}>DAS</Text>
                            </Text>
                        </ImageBackground>
                    </View>

                    <View style={styles.content}>
                        <View accessibilityRole="tablist" style={styles.tabBar}>
                            <Pressable
                                accessibilityRole="tab"
                                accessibilityState={{ selected: !isSignUp }}
                                onPress={() => setIsSignUp(false)}
                                style={[styles.tab, !isSignUp && styles.activeTab]}
                            >
                                <Text style={[styles.tabText, !isSignUp && styles.activeTabText]}>
                                    Login
                                </Text>
                            </Pressable>
                            <Pressable
                                accessibilityRole="tab"
                                accessibilityState={{ selected: isSignUp }}
                                onPress={() => setIsSignUp(true)}
                                style={[styles.tab, isSignUp && styles.activeTab]}
                            >
                                <Text style={[styles.tabText, isSignUp && styles.activeTabText]}>
                                    Sign up
                                </Text>
                            </Pressable>
                        </View>

                        <View style={styles.form}>
                            <FormField icon="user" placeholder="Username" />
                            {isSignUp && (
                                <FormField
                                    icon="email"
                                    keyboardType="email-address"
                                    placeholder="Enter your email"
                                />
                            )}
                            <FormField
                                icon="lock"
                                placeholder={isSignUp ? 'Enter your password' : 'Password'}
                                secureTextEntry
                            />
                            {isSignUp && (
                                <FormField
                                    icon="lock"
                                    placeholder="Confirm password"
                                    secureTextEntry
                                />
                            )}
                        </View>

                        {!isSignUp && (
                            <Pressable accessibilityRole="button" style={styles.forgotPassword} onPress={() => router.push('/forgotpass_page')}>
                                <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                            </Pressable>
                        )}

                        <Pressable
                            accessibilityRole="button"
                            onPress={() => router.replace('/homepage')}
                            style={styles.submitButton}
                        >
                            <Text style={styles.submitButtonText}>
                                {isSignUp ? 'Create Account' : 'LOGIN'}
                            </Text>
                        </Pressable>

                        <View style={styles.socialSection}>
                            <View style={styles.divider} />
                            <Text style={styles.socialLabel}>Sign in with</Text>
                            <View style={styles.socialButtons}>
                                <Pressable
                                    accessibilityLabel="Continue with Facebook"
                                    accessibilityRole="button"
                                    style={styles.socialButton}
                                >
                                    <Image
                                        resizeMode="contain"
                                        source={socialIcons.facebook}
                                        style={styles.socialIcon}
                                    />
                                </Pressable>
                                <Pressable
                                    accessibilityLabel="Continue with Google"
                                    accessibilityRole="button"
                                    style={styles.socialButton}
                                >
                                    <Image
                                        resizeMode="contain"
                                        source={socialIcons.google}
                                        style={styles.socialIcon}
                                    />
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default LoginPage;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#000000',
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        backgroundColor: '#000000',
        paddingBottom: 24,
    },
    hero: {
        width: '100%',
        paddingHorizontal: 15,
        paddingTop: 8,
    },
    heroImageBackground: {
        flex: 1,
        justifyContent: 'flex-end',
        overflow: 'hidden',
    },
    heroImage: {
        borderRadius: 28,
    },
    backButton: {
        position: 'absolute',
        top: 16,
        left: 16,
        zIndex: 1,
        width: 34,
        height: 34,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 17,
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.35)',
    },
    backIcon: {
        width: 18,
        height: 18,
        tintColor: '#FFFFFF',
    },
    heroGradient: {
        ...StyleSheet.absoluteFill,
    },
    logo: {
        alignSelf: 'center',
        marginBottom: 10,
        fontFamily: 'Poppins_700Bold',
        fontSize: 50,
        lineHeight: 62,
        textShadowColor: '#000000',
        textShadowRadius: 6,
        textShadowOffset: { width: 0, height: 2 },
    },
    logoWhite: {
        color: '#FFFFFF',
    },
    logoGreen: {
        color: '#19F000',
    },
    content: {
        flex: 1,
        paddingHorizontal: 25,
    },
    tabBar: {
        alignSelf: 'center',
        flexDirection: 'row',
        marginTop: 4,
        marginBottom: 22,
        padding: 3,
        borderRadius: 7,
        backgroundColor: '#242424',
    },
    tab: {
        minWidth: 65,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 5,
    },
    activeTab: {
        backgroundColor: '#111111',
    },
    tabText: {
        color: '#777777',
        fontSize: 13,
        fontWeight: '700',
    },
    activeTabText: {
        color: '#FFFFFF',
    },
    form: {
        gap: 12,
    },
    field: {
        height: 46,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 6,
        backgroundColor: '#111111',
    },
    fieldIcon: {
        width: 44,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: StyleSheet.hairlineWidth,
        borderRightColor: '#393939',
    },
    fieldIconImage: {
        width: 18,
        height: 18,
        tintColor: '#FFFFFF',
    },
    input: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 9,
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },
    visibilityButton: {
        height: '100%',
        justifyContent: 'center',
        paddingHorizontal: 12,
    },
    visibilityIcon: {
        width: 18,
        height: 18,
        tintColor: '#FFFFFF',
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginTop: 3,
        marginBottom: 7,
    },
    forgotPasswordText: {
        color: '#777777',
        fontSize: 10,
        textDecorationLine: 'underline',
    },
    submitButton: {
        height: 46,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,
        marginTop: 9,
        backgroundColor: '#119c02',
    },
    submitButtonText: {
        color: '#f5f3f3',
        fontFamily: 'Poppins_700Bold',
        fontSize: 18,
    },
    socialSection: {
        alignItems: 'center',
        marginTop: 18,
    },
    divider: {
        width: '100%',
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#FFFFFF',
    },
    socialLabel: {
        position: 'absolute',
        top: -7,
        paddingHorizontal: 8,
        backgroundColor: '#000000',
        color: '#FFFFFF',
        fontSize: 9,
        fontWeight: '600',
    },
    socialButtons: {
        flexDirection: 'row',
        gap: 26,
        marginTop: 22,
    },
    socialButton: {
        width: 42,
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#242424',
    },
    socialIcon: {
        width: 26,
        height: 26,
    },
});
