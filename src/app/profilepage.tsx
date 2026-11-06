import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';

const ProfilePage = () => {
    const { colors } = useTheme();
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState('Trail Explorer');
    const [email, setEmail] = useState('');
    const [draftName, setDraftName] = useState(name);
    const [draftEmail, setDraftEmail] = useState(email);

    const startEditing = () => {
        setDraftName(name);
        setDraftEmail(email);
        setIsEditing(true);
    };

    const saveProfile = () => {
        const normalizedName = draftName.trim();
        if (!normalizedName) {
            Alert.alert('Name required', 'Please enter a name before saving your profile.');
            return;
        }

        setName(normalizedName);
        setEmail(draftEmail.trim());
        setIsEditing(false);
        Alert.alert(
            'Profile updated',
            'These profile details are currently saved only for this session.',
        );
    };

    return (
        <SafeAreaView edges={['top', 'bottom']} style={[styles.safeArea, { backgroundColor: colors.background }]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidingView}
            >
                <View style={[styles.page, { backgroundColor: colors.background }]}>
                    <View style={[styles.header, { borderBottomColor: colors.border }]}>
                        <Pressable
                            accessibilityLabel="Back to home"
                            accessibilityRole="button"
                            onPress={() => router.replace('/homepage')}
                            style={[
                                styles.backButton,
                                { backgroundColor: colors.elevatedSurface, borderColor: colors.border },
                            ]}
                        >
                            <Text style={[styles.backArrow, { color: colors.foreground }]}>‹</Text>
                        </Pressable>
                        <Text style={[styles.headerTitle, { color: colors.foreground }]}>MY PROFILE</Text>
                        <View style={styles.headerSpacer} />
                    </View>

                    <ScrollView
                        contentContainerStyle={styles.scrollContent}
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={false}
                    >
                        <ImageBackground
                            accessibilityLabel="Mountain landscape"
                            imageStyle={styles.coverImage}
                            resizeMode="cover"
                            source={require('../../assets/images/Starting_page4.jpg')}
                            style={styles.cover}
                        >
                            <LinearGradient
                                colors={['rgba(0,0,0,0.12)', 'rgba(0,0,0,0.78)']}
                                style={styles.coverGradient}
                            />
                            <View style={styles.coverTag}>
                                <View style={styles.coverDot} />
                                <Text style={styles.coverTagText}>LANDAS HIKER</Text>
                            </View>
                        </ImageBackground>

                        <View style={styles.identity}>
                            <View style={styles.avatar}>
                                <Text style={styles.avatarInitial}>
                                    {(name.trim()[0] || 'T').toUpperCase()}
                                </Text>
                            </View>
                            <Text style={[styles.identityName, { color: colors.foreground }]}>{name}</Text>
                            <Text style={[styles.identityCaption, { color: colors.muted }]}>YOUR ADVENTURE STARTS HERE</Text>
                        </View>

                        <View style={styles.sectionHeading}>
                            <View>
                                <Text style={[styles.sectionEyebrow, { color: colors.subtle }]}>YOUR DETAILS</Text>
                                <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Profile information</Text>
                            </View>
                            {!isEditing && (
                                <Pressable
                                    accessibilityRole="button"
                                    onPress={startEditing}
                                    style={[
                                        styles.editButton,
                                        { backgroundColor: colors.elevatedSurface, borderColor: colors.border },
                                    ]}
                                >
                                    <Text style={[styles.editButtonText, { color: colors.accent }]}>EDIT</Text>
                                </Pressable>
                            )}
                        </View>

                        <View style={[styles.detailsCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                            <View style={styles.detailRow}>
                                <View style={[styles.detailIconWrap, { backgroundColor: colors.accentSoft }]}>
                                    <Text style={[styles.detailIcon, { color: colors.accent }]}>♙</Text>
                                </View>
                                <View style={styles.detailContent}>
                                    <Text style={[styles.detailLabel, { color: colors.muted }]}>NAME</Text>
                                    {isEditing ? (
                                        <TextInput
                                            accessibilityLabel="Your name"
                                            autoCapitalize="words"
                                            onChangeText={setDraftName}
                                            placeholder="Your name"
                                            placeholderTextColor="#737A72"
                                            returnKeyType="next"
                                            style={[styles.detailInput, { color: colors.foreground, backgroundColor: colors.input }]}
                                            value={draftName}
                                        />
                                    ) : (
                                        <Text style={[styles.detailValue, { color: colors.foreground }]}>{name}</Text>
                                    )}
                                </View>
                            </View>
                            <View style={[styles.rowDivider, { backgroundColor: colors.border }]} />
                            <View style={styles.detailRow}>
                                <View style={[styles.detailIconWrap, { backgroundColor: colors.accentSoft }]}>
                                    <Text style={[styles.detailIcon, { color: colors.accent }]}>✉</Text>
                                </View>
                                <View style={styles.detailContent}>
                                    <Text style={[styles.detailLabel, { color: colors.muted }]}>EMAIL ADDRESS</Text>
                                    {isEditing ? (
                                        <TextInput
                                            accessibilityLabel="Email address"
                                            autoCapitalize="none"
                                            autoComplete="email"
                                            keyboardType="email-address"
                                            onChangeText={setDraftEmail}
                                            placeholder="Add your email"
                                            placeholderTextColor="#737A72"
                                            returnKeyType="done"
                                            style={[styles.detailInput, { color: colors.foreground, backgroundColor: colors.input }]}
                                            value={draftEmail}
                                        />
                                    ) : (
                                        <Text style={[styles.detailValue, { color: colors.foreground }, !email && [styles.mutedValue, { color: colors.muted }]]}>
                                            {email || 'Not added'}
                                        </Text>
                                    )}
                                </View>
                            </View>
                        </View>

                        {isEditing && (
                            <View style={styles.editActions}>
                                <Pressable
                                    accessibilityRole="button"
                                    onPress={() => setIsEditing(false)}
                                    style={[
                                        styles.cancelButton,
                                        { backgroundColor: colors.elevatedSurface, borderColor: colors.border },
                                    ]}
                                >
                                    <Text style={[styles.cancelButtonText, { color: colors.secondary }]}>CANCEL</Text>
                                </Pressable>
                                <Pressable
                                    accessibilityRole="button"
                                    onPress={saveProfile}
                                    style={[styles.saveProfileButton, { backgroundColor: colors.accent }]}
                                >
                                    <Text style={[styles.saveProfileButtonText, { color: colors.accentText }]}>SAVE CHANGES</Text>
                                </Pressable>
                            </View>
                        )}

                        <View style={styles.sectionHeading}>
                            <View>
                                <Text style={[styles.sectionEyebrow, { color: colors.subtle }]}>YOUR NEXT ADVENTURE</Text>
                                <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Mount Megatong</Text>
                            </View>
                            <Text style={[styles.mountainIcon, { color: colors.accent }]}>⌁</Text>
                        </View>

                        <View style={[styles.destinationCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                            <ImageBackground
                                accessibilityLabel="Mountain destination"
                                imageStyle={styles.destinationImage}
                                resizeMode="cover"
                                source={require('../../assets/images/fpasspic.png')}
                                style={styles.destinationBackground}
                            >
                                <LinearGradient
                                    colors={['transparent', 'rgba(0,0,0,0.82)']}
                                    style={styles.destinationGradient}
                                />
                                <View style={styles.destinationCopy}>
                                    <Text style={styles.destinationCaption}>ONE MOUNTAIN. YOUR NEXT STORY.</Text>
                                    <Text style={styles.destinationName}>Mount Megatong</Text>
                                </View>
                            </ImageBackground>
                            <Pressable
                                accessibilityRole="button"
                                onPress={() => router.replace('/homepage')}
                                style={[styles.destinationLink, { backgroundColor: colors.surface }]}
                            >
                                <Text style={[styles.destinationLinkText, { color: colors.secondary }]}>BACK TO YOUR DESTINATION</Text>
                                <Text style={[styles.destinationArrow, { color: colors.accent }]}>→</Text>
                            </Pressable>
                        </View>

                        <View style={[styles.noteCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                            <Text style={[styles.noteIcon, { color: colors.secondary }]}>ⓘ</Text>
                            <Text style={[styles.noteText, { color: colors.secondary }]}>
                                Profile editing is a preview. Your details aren’t synced to an account yet.
                            </Text>
                        </View>
                    </ScrollView>

                    <View style={[styles.bottomBar, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
                        <Pressable
                            accessibilityRole="button"
                            onPress={() => router.replace('/homepage')}
                            style={styles.homeButton}
                        >
                            <Text style={[styles.homeIcon, { color: colors.subtle }]}>⌂</Text>
                            <Text style={[styles.homeLabel, { color: colors.subtle }]}>HOME</Text>
                        </Pressable>
                        <View style={styles.profileTab}>
                            <Text style={[styles.selectedProfileIcon, { color: colors.accent }]}>♙</Text>
                            <Text style={[styles.selectedProfileLabel, { color: colors.accent }]}>PROFILE</Text>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ProfilePage;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#080A08',
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    page: {
        flex: 1,
        backgroundColor: '#080A08',
    },
    header: {
        height: 54,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#252B25',
    },
    backButton: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#293229',
        borderRadius: 18,
        backgroundColor: '#131713',
    },
    backArrow: {
        marginTop: -4,
        color: '#FFFFFF',
        fontSize: 29,
        lineHeight: 34,
    },
    headerTitle: {
        color: '#F3F4F2',
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 2,
    },
    headerSpacer: {
        width: 36,
    },
    scrollContent: {
        paddingBottom: 24,
    },
    cover: {
        height: 178,
        marginHorizontal: 16,
        marginTop: 14,
        overflow: 'hidden',
        borderRadius: 18,
        backgroundColor: '#171C17',
    },
    coverImage: {
        borderRadius: 18,
    },
    coverGradient: {
        ...StyleSheet.absoluteFill,
        borderRadius: 18,
    },
    coverTag: {
        position: 'absolute',
        top: 13,
        left: 13,
        height: 29,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
        paddingHorizontal: 10,
        borderRadius: 16,
        backgroundColor: 'rgba(8,10,8,0.68)',
    },
    coverDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#19F000',
    },
    coverTagText: {
        color: '#FFFFFF',
        fontSize: 8,
        fontWeight: '800',
        letterSpacing: 1,
    },
    identity: {
        alignItems: 'center',
        marginTop: -43,
    },
    avatar: {
        width: 82,
        height: 82,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 4,
        borderColor: '#080A08',
        borderRadius: 42,
        backgroundColor: '#1A2618',
    },
    avatarInitial: {
        color: '#19F000',
        fontSize: 30,
        fontWeight: '800',
    },
    identityName: {
        marginTop: 8,
        color: '#FFFFFF',
        fontSize: 21,
        fontWeight: '800',
    },
    identityCaption: {
        marginTop: 3,
        color: '#878E86',
        fontSize: 8,
        fontWeight: '700',
        letterSpacing: 1.6,
    },
    sectionHeading: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingHorizontal: 22,
        marginTop: 23,
        marginBottom: 11,
    },
    sectionEyebrow: {
        color: '#7D847C',
        fontSize: 8,
        fontWeight: '800',
        letterSpacing: 1.4,
    },
    sectionTitle: {
        marginTop: 4,
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '700',
    },
    editButton: {
        marginBottom: 2,
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderWidth: 1,
        borderColor: '#354333',
        borderRadius: 10,
        backgroundColor: '#141B13',
    },
    editButtonText: {
        color: '#19F000',
        fontSize: 8,
        fontWeight: '900',
        letterSpacing: 0.9,
    },
    detailsCard: {
        marginHorizontal: 16,
        paddingHorizontal: 14,
        borderWidth: 1,
        borderColor: '#252B25',
        borderRadius: 15,
        backgroundColor: '#111411',
    },
    detailRow: {
        minHeight: 67,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    detailIconWrap: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
        borderRadius: 11,
        backgroundColor: '#1A2618',
    },
    detailIcon: {
        color: '#19F000',
        fontSize: 17,
    },
    detailContent: {
        flex: 1,
    },
    detailLabel: {
        color: '#7F877E',
        fontSize: 8,
        fontWeight: '800',
        letterSpacing: 1.1,
    },
    detailValue: {
        marginTop: 4,
        color: '#F2F4F1',
        fontSize: 12,
        fontWeight: '600',
    },
    mutedValue: {
        color: '#798078',
        fontWeight: '400',
    },
    detailInput: {
        minHeight: 30,
        marginTop: 1,
        paddingVertical: 4,
        color: '#FFFFFF',
        fontSize: 12,
    },
    rowDivider: {
        height: StyleSheet.hairlineWidth,
        marginLeft: 48,
        backgroundColor: '#2A302A',
    },
    editActions: {
        flexDirection: 'row',
        gap: 10,
        marginHorizontal: 16,
        marginTop: 10,
    },
    cancelButton: {
        height: 42,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#343A34',
        borderRadius: 11,
        backgroundColor: '#121512',
    },
    cancelButtonText: {
        color: '#C4C8C2',
        fontSize: 9,
        fontWeight: '800',
        letterSpacing: 0.6,
    },
    saveProfileButton: {
        height: 42,
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 11,
        backgroundColor: '#19F000',
    },
    saveProfileButtonText: {
        color: '#071006',
        fontSize: 9,
        fontWeight: '900',
        letterSpacing: 0.5,
    },
    mountainIcon: {
        color: '#19F000',
        fontSize: 25,
    },
    destinationCard: {
        marginHorizontal: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#272D27',
        borderRadius: 15,
        backgroundColor: '#111411',
    },
    destinationBackground: {
        height: 145,
        justifyContent: 'flex-end',
    },
    destinationImage: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    destinationGradient: {
        ...StyleSheet.absoluteFill,
    },
    destinationCopy: {
        paddingHorizontal: 14,
        paddingBottom: 14,
    },
    destinationCaption: {
        color: '#D5E4D1',
        fontSize: 8,
        fontWeight: '800',
        letterSpacing: 1.2,
    },
    destinationName: {
        marginTop: 4,
        color: '#FFFFFF',
        fontSize: 19,
        fontWeight: '800',
    },
    destinationLink: {
        height: 43,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 14,
    },
    destinationLinkText: {
        color: '#C8CDC6',
        fontSize: 8,
        fontWeight: '800',
        letterSpacing: 0.8,
    },
    destinationArrow: {
        color: '#19F000',
        fontSize: 17,
    },
    noteCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 9,
        marginHorizontal: 16,
        marginTop: 14,
        paddingHorizontal: 12,
        paddingVertical: 11,
        borderWidth: 1,
        borderColor: '#30372F',
        borderRadius: 11,
        backgroundColor: '#121612',
    },
    noteIcon: {
        color: '#A3AD9F',
        fontSize: 14,
    },
    noteText: {
        flex: 1,
        color: '#929991',
        fontSize: 9,
        lineHeight: 14,
    },
    bottomBar: {
        minHeight: 62,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#2A302A',
        backgroundColor: '#0D100D',
    },
    homeButton: {
        minWidth: 90,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        paddingVertical: 6,
    },
    homeIcon: {
        color: '#777E76',
        fontSize: 20,
        lineHeight: 23,
    },
    homeLabel: {
        color: '#777E76',
        fontSize: 8,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    profileTab: {
        minWidth: 90,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        paddingVertical: 6,
    },
    selectedProfileIcon: {
        color: '#19F000',
        fontSize: 20,
        lineHeight: 23,
    },
    selectedProfileLabel: {
        color: '#19F000',
        fontSize: 8,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
});
