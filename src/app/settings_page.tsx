import { router } from 'expo-router';
import type { ReactNode } from 'react';
import {
    Alert,
    Image,
    type ImageSourcePropType,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';

type SettingsRowProps = {
    icon: ImageSourcePropType;
    label: string;
    description: string;
    value?: string;
    switchValue?: boolean;
    disabled?: boolean;
    onPress: () => void;
};

const SettingsRow = ({
    icon,
    label,
    description,
    value,
    switchValue,
    disabled = false,
    onPress,
}: SettingsRowProps) => {
    const { colors } = useTheme();

    return (
        <Pressable
            accessibilityRole={switchValue === undefined ? 'button' : 'switch'}
            accessibilityLabel={`${label}. ${description}`}
            accessibilityState={switchValue === undefined ? undefined : { checked: switchValue }}
            disabled={disabled}
            onPress={onPress}
            style={({ pressed }) => [styles.settingsRow, pressed && styles.rowPressed, disabled && styles.rowDisabled]}
        >
            <View style={[styles.rowIconWrap, { backgroundColor: colors.accentSoft }]}>
                <Image source={icon} style={[styles.rowIcon, { tintColor: colors.accent }]} />
            </View>
            <View style={styles.rowCopy}>
                <Text style={[styles.rowTitle, { color: colors.foreground }]}>{label}</Text>
                <Text style={[styles.rowDescription, { color: colors.muted }]}>{description}</Text>
            </View>
            {switchValue !== undefined ? (
                <View
                    accessibilityElementsHidden
                    style={[
                        styles.switchTrack,
                        {
                            backgroundColor: switchValue ? colors.accent : colors.elevatedSurface,
                            borderColor: switchValue ? colors.accent : colors.border,
                        },
                    ]}
                >
                    <View
                        style={[
                            styles.switchThumb,
                            switchValue && styles.switchThumbOn,
                            { backgroundColor: switchValue ? colors.accentText : colors.muted },
                        ]}
                    />
                </View>
            ) : value ? (
                <Text style={[styles.rowValue, { color: colors.muted }]}>{value}</Text>
            ) : (
                <Image
                    accessibilityElementsHidden
                    source={require('../../assets/images/tabIcons/icons8-arrow-50.png')}
                    style={[styles.chevronIcon, { tintColor: colors.muted }]}
                />
            )}
        </Pressable>
    );
};

const SettingsPage = () => {
    const { mode, colors, isSaving, toggleTheme } = useTheme();

    return (
    <SafeAreaView edges={['top', 'bottom']} style={[styles.safeArea, { backgroundColor: colors.background }]}>
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
                <View style={styles.headerCopy}>
                    <Text style={[styles.headerTitle, { color: colors.foreground }]}>SETTINGS</Text>
                    <Text style={[styles.headerSubtitle, { color: colors.muted }]}>MAKE LANDAS YOURS</Text>
                </View>
                <View style={styles.headerSpacer} />
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.intro}>
                    <Text style={[styles.eyebrow, { color: colors.accent }]}>YOUR APP, YOUR WAY</Text>
                    <Text style={[styles.title, { color: colors.foreground }]}>Settings</Text>
                    <Text style={[styles.subtitle, { color: colors.secondary }]}>
                        Manage your account and hiking preferences.
                    </Text>
                </View>

                <Pressable
                    accessibilityLabel="Open your profile"
                    accessibilityRole="button"
                    onPress={() => router.push('/profilepage')}
                    style={({ pressed }) => [
                        styles.profileCard,
                        { backgroundColor: colors.surface, borderColor: colors.border },
                        pressed && styles.rowPressed,
                    ]}
                >
                    <View style={[styles.profileAvatar, { backgroundColor: colors.accentSoft }]}>
                        <Image
                            source={require('../../assets/images/tabIcons/icons8-user-96.png')}
                            style={[styles.profileIcon, { tintColor: colors.accent }]}
                        />
                    </View>
                    <View style={styles.profileCopy}>
                        <Text style={[styles.profileEyebrow, { color: colors.accent }]}>LANDAS HIKER</Text>
                        <Text style={[styles.profileTitle, { color: colors.foreground }]}>Your profile</Text>
                        <Text style={[styles.profileDescription, { color: colors.muted }]}>Edit your personal details</Text>
                    </View>
                    <Image
                        accessibilityElementsHidden
                        source={require('../../assets/images/tabIcons/icons8-arrow-50.png')}
                        style={[styles.chevronIcon, { tintColor: colors.muted }]}
                    />
                </Pressable>

                <SettingsSection colors={colors} title="PREFERENCES">
                    <SettingsRow
                        description="Satellite, terrain and street views"
                        icon={require('../../assets/images/tabIcons/icons8-paper-map-50.png')}
                        label="Map appearance"
                        onPress={() => router.push('/mappage')}
                    />
                    <View style={[styles.rowDivider, { backgroundColor: colors.border }]} />
                    <SettingsRow
                        description="Find your position from the map"
                        icon={require('../../assets/images/tabIcons/icons8-location-50.png')}
                        label="Location access"
                        onPress={() => router.push('/mappage')}
                    />
                    <View style={[styles.rowDivider, { backgroundColor: colors.border }]} />
                    <SettingsRow
                        description="Hike alerts and updates"
                        icon={require('../../assets/images/tabIcons/icons8-notification-24.png')}
                        label="Notifications"
                        onPress={() =>
                            Alert.alert(
                                'Notifications',
                                'Hike notifications are not available yet.',
                            )
                        }
                        value="COMING SOON"
                    />
                    <View style={[styles.rowDivider, { backgroundColor: colors.border }]} />
                    <SettingsRow
                        description={`Switch between light and dark mode. Currently ${mode}.`}
                        icon={require('../../assets/images/tabIcons/icons8-moon-symbol-50.png')}
                        label="Appearance"
                        onPress={toggleTheme}
                        disabled={isSaving}
                        switchValue={mode === 'dark'}
                    />
                </SettingsSection>

                <SettingsSection colors={colors} title="SAFETY & SUPPORT">
                    <SettingsRow
                        description="How location is used in the app"
                        icon={require('../../assets/images/tabIcons/icons8-warning-shield-50.png')}
                        label="Privacy & safety"
                        onPress={() =>
                            Alert.alert(
                                'Privacy & safety',
                                'Landas asks for location access only when you tap “My Location” on the map. You can deny access and still use the map.',
                            )
                        }
                    />
                    <View style={[styles.rowDivider, { backgroundColor: colors.border }]} />
                    <SettingsRow
                        description="Get help using Landas"
                        icon={require('../../assets/images/tabIcons/icons8-question-50.png')}
                        label="Help center"
                        onPress={() =>
                            Alert.alert(
                                'Help center',
                                'For now, use the Home, Map, Trail Guide, and Saved sections to explore Landas.',
                            )
                        }
                    />
                    <View style={[styles.rowDivider, { backgroundColor: colors.border }]} />
                    <SettingsRow
                        description="Landas app information"
                        icon={require('../../assets/images/tabIcons/icons8-exclamation-50.png')}
                        label="About Landas"
                        onPress={() =>
                            Alert.alert(
                                'About Landas',
                                'Landas is your mountain companion, currently focused on Mount Megatong.',
                            )
                        }
                        value="1.0.0"
                    />
                </SettingsSection>

                <View style={styles.footer}>
                    <View style={styles.footerMark}>
                        <View style={styles.footerDot} />
                        <Text style={[styles.footerWordmark, { color: colors.foreground }]}>
                            LAN<Text style={[styles.footerWordmarkGreen, { color: colors.accent }]}>DAS</Text>
                        </Text>
                    </View>
                    <Text style={[styles.footerCaption, { color: colors.muted }]}>MADE FOR THE WAY UP</Text>
                </View>
            </ScrollView>
        </View>
    </SafeAreaView>
    );
};

type SettingsSectionProps = {
    title: string;
    children: ReactNode;
    colors: ReturnType<typeof useTheme>['colors'];
};

const SettingsSection = ({ title, children, colors }: SettingsSectionProps) => (
    <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.subtle }]}>{title}</Text>
        <View style={[styles.sectionCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            {children}
        </View>
    </View>
);

export default SettingsPage;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#080A08',
    },
    page: {
        flex: 1,
        backgroundColor: '#080A08',
    },
    header: {
        height: 57,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 17,
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
    headerCopy: {
        flex: 1,
        marginLeft: 12,
    },
    headerTitle: {
        color: '#F3F4F2',
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 1.5,
    },
    headerSubtitle: {
        marginTop: 2,
        color: '#8D948B',
        fontSize: 8,
        fontWeight: '700',
        letterSpacing: 1,
    },
    headerSpacer: {
        width: 36,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    intro: {
        marginTop: 25,
        marginBottom: 20,
    },
    eyebrow: {
        color: '#19F000',
        fontSize: 9,
        fontWeight: '800',
        letterSpacing: 1.6,
    },
    title: {
        marginTop: 6,
        color: '#FFFFFF',
        fontSize: 30,
        fontWeight: '800',
        letterSpacing: -0.5,
    },
    subtitle: {
        marginTop: 5,
        color: '#A0A49F',
        fontSize: 12,
    },
    profileCard: {
        minHeight: 82,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        borderWidth: 1,
        borderColor: '#2A3428',
        borderRadius: 16,
        backgroundColor: '#121812',
    },
    profileAvatar: {
        width: 46,
        height: 46,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,
        backgroundColor: '#1C2A19',
    },
    profileIcon: {
        width: 25,
        height: 25,
        tintColor: '#19F000',
    },
    profileCopy: {
        flex: 1,
        marginLeft: 12,
    },
    profileEyebrow: {
        color: '#19F000',
        fontSize: 8,
        fontWeight: '800',
        letterSpacing: 1.2,
    },
    profileTitle: {
        marginTop: 3,
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '700',
    },
    profileDescription: {
        marginTop: 2,
        color: '#888F86',
        fontSize: 10,
    },
    section: {
        marginTop: 23,
    },
    sectionTitle: {
        marginBottom: 9,
        color: '#7D847C',
        fontSize: 9,
        fontWeight: '800',
        letterSpacing: 1.4,
    },
    sectionCard: {
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#252D25',
        borderRadius: 16,
        backgroundColor: '#101310',
    },
    settingsRow: {
        minHeight: 69,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    rowPressed: {
        opacity: 0.72,
    },
    rowDisabled: {
        opacity: 0.6,
    },
    rowIconWrap: {
        width: 37,
        height: 37,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 11,
        backgroundColor: '#192119',
    },
    rowIcon: {
        width: 21,
        height: 21,
        resizeMode: 'contain',
        tintColor: '#19F000',
    },
    rowCopy: {
        flex: 1,
        marginLeft: 11,
        marginRight: 8,
    },
    rowTitle: {
        color: '#F4F5F3',
        fontSize: 11,
        fontWeight: '700',
    },
    rowDescription: {
        marginTop: 3,
        color: '#818880',
        fontSize: 9,
        lineHeight: 13,
    },
    rowValue: {
        color: '#7D847C',
        fontSize: 7,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    chevronIcon: {
        width: 16,
        height: 16,
        resizeMode: 'contain',
        tintColor: '#747D72',
    },
    switchTrack: {
        width: 43,
        height: 25,
        justifyContent: 'center',
        paddingHorizontal: 3,
        borderWidth: 1,
        borderRadius: 13,
    },
    switchThumb: {
        width: 17,
        height: 17,
        borderRadius: 9,
    },
    switchThumbOn: {
        alignSelf: 'flex-end',
    },
    rowDivider: {
        height: StyleSheet.hairlineWidth,
        marginLeft: 48,
        backgroundColor: '#293029',
    },
    footer: {
        alignItems: 'center',
        marginTop: 30,
    },
    footerMark: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    footerDot: {
        width: 5,
        height: 5,
        marginRight: 7,
        borderRadius: 3,
        backgroundColor: '#19F000',
    },
    footerWordmark: {
        color: '#C6CBC4',
        fontSize: 12,
        fontWeight: '900',
        letterSpacing: 1,
    },
    footerWordmarkGreen: {
        color: '#19F000',
    },
    footerCaption: {
        marginTop: 4,
        color: '#646B63',
        fontSize: 7,
        fontWeight: '700',
        letterSpacing: 1.4,
    },
});
