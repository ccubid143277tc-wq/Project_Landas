import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../contexts/ThemeContext';

type HomeTab = 'Home' | 'Trail Guide' | 'Saved';

const Homepage = () => {
    const [activeTab, setActiveTab] = useState<HomeTab>('Home');
    const [isSaved, setIsSaved] = useState(false);
    const { colors } = useTheme();

    const showHome = activeTab === 'Home';
    const showGuide = activeTab === 'Trail Guide';

    return (
        <SafeAreaView edges={['top', 'bottom']} style={[styles.safeArea, { backgroundColor: colors.background }]}>
            <View style={[styles.page, { backgroundColor: colors.background }]}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.header}>
                        <View>
                            <Text style={styles.wordmark}>
                                <Text style={[styles.wordmarkLight, { color: colors.foreground }]}>LAN</Text>
                                <Text style={[styles.wordmarkGreen, { color: colors.accent }]}>DAS</Text>
                            </Text>
                            <Text style={[styles.headerCaption, { color: colors.muted }]}>YOUR MOUNTAIN COMPANION</Text>
                        </View>
                        <View style={styles.headerActions}>
                            <Pressable
                                accessibilityLabel="Open settings"
                                accessibilityRole="button"
                                onPress={() => router.push('/settings_page')}
                                style={[styles.settingsBadge, { backgroundColor: colors.elevatedSurface, borderColor: colors.border }]}
                            >
                                <Text style={[styles.settingsIcon, { color: colors.accent }]}>⚙</Text>
                            </Pressable>
                            <Pressable
                                accessibilityLabel="Open your profile"
                                accessibilityRole="button"
                                onPress={() => router.push('/profilepage')}
                                style={[styles.profileBadge, { backgroundColor: colors.elevatedSurface, borderColor: colors.border }]}
                            >
                                <Text style={[styles.profileInitials, { color: colors.accent }]}>L</Text>
                            </Pressable>
                        </View>
                    </View>

                    {showHome && (
                        <>
                            <View style={styles.intro}>
                                <Text style={[styles.eyebrow, { color: colors.accent }]}>YOUR LOCAL ADVENTURE</Text>
                                <Text style={[styles.introTitle, { color: colors.foreground }]}>One mountain.{'\n'}A thousand reasons to go.</Text>
                                <Text style={[styles.introBody, { color: colors.secondary }]}>
                                    Get ready for your Mount Megatong adventure.
                                </Text>
                            </View>

                            <View style={styles.destinationCard}>
                                <Image
                                    accessibilityLabel="Hiker walking through a mountain landscape"
                                    resizeMode="cover"
                                    source={require('../../assets/images/fpasspic.png')}
                                    style={styles.destinationImage}
                                />
                                <LinearGradient
                                    colors={['rgba(0,0,0,0.04)', 'rgba(0,0,0,0.88)']}
                                    locations={[0.2, 1]}
                                    style={styles.destinationGradient}
                                />
                                <View style={styles.destinationTopRow}>
                                    <View style={styles.destinationTag}>
                                        <View style={styles.tagDot} />
                                        <Text style={styles.destinationTagText}>DESTINATION SPOTLIGHT</Text>
                                    </View>
                                    <Pressable
                                        accessibilityLabel={isSaved ? 'Remove Mount Megatong from saved' : 'Save Mount Megatong'}
                                        accessibilityRole="button"
                                        accessibilityState={{ selected: isSaved }}
                                        onPress={() => setIsSaved(!isSaved)}
                                        style={styles.saveButton}
                                    >
                                        <Text style={[styles.saveIcon, isSaved && styles.savedIcon]}>
                                            {isSaved ? '♥' : '♡'}
                                        </Text>
                                    </Pressable>
                                </View>
                                <View style={styles.destinationCopy}>
                                    <Text style={styles.destinationEyebrow}>THE MOUNTAIN IS CALLING</Text>
                                    <Text style={styles.destinationName}>Mount Megatong</Text>
                                    <Text style={styles.destinationDescription}>
                                        Find your next great story on the trail.
                                    </Text>
                                    <Pressable
                                        accessibilityRole="button"
                                        onPress={() => setActiveTab('Trail Guide')}
                                        style={({ pressed }) => [
                                            styles.primaryButton,
                                            pressed && styles.buttonPressed,
                                        ]}
                                    >
                                        <Text style={styles.primaryButtonText}>EXPLORE THE GUIDE</Text>
                                        <Text style={styles.primaryButtonArrow}>→</Text>
                                    </Pressable>
                                </View>
                            </View>

                            <View style={styles.sectionHeading}>
                                <View>
                                    <Text style={[styles.sectionEyebrow, { color: colors.subtle }]}>MAKE IT A GOOD HIKE</Text>
                                    <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Before you set out</Text>
                                </View>
                                <Text style={[styles.sectionDecoration, { color: colors.accent }]}>✳</Text>
                            </View>

                            <View style={[styles.tipCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                                <View style={[styles.tipIconWrap, { backgroundColor: colors.accentSoft }]}>
                                    <Text style={[styles.tipIcon, { color: colors.accent }]}>↗</Text>
                                </View>
                                <View style={styles.tipCopy}>
                                    <Text style={[styles.tipTitle, { color: colors.foreground }]}>Check local trail updates</Text>
                                    <Text style={[styles.tipBody, { color: colors.secondary }]}>
                                        Confirm current conditions and access with a local guide before leaving.
                                    </Text>
                                </View>
                            </View>
                            <View style={[styles.tipCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                                <View style={[styles.tipIconWrap, { backgroundColor: colors.accentSoft }]}>
                                    <Text style={[styles.tipIcon, { color: colors.accent }]}>◎</Text>
                                </View>
                                <View style={styles.tipCopy}>
                                    <Text style={[styles.tipTitle, { color: colors.foreground }]}>Share your plans</Text>
                                    <Text style={[styles.tipBody, { color: colors.secondary }]}>
                                        Let someone know your route and when you expect to return.
                                    </Text>
                                </View>
                            </View>

                            <Pressable
                                accessibilityRole="button"
                                onPress={() => setActiveTab('Trail Guide')}
                                style={[
                                    styles.secondaryButton,
                                    { backgroundColor: colors.elevatedSurface, borderColor: colors.border },
                                ]}
                            >
                                <Text style={[styles.secondaryButtonText, { color: colors.foreground }]}>PREPARE FOR YOUR HIKE</Text>
                                <Text style={[styles.secondaryButtonArrow, { color: colors.accent }]}>→</Text>
                            </Pressable>
                        </>
                    )}

                    {showGuide && (
                        <>
                            <View style={styles.pageIntro}>
                                <Text style={[styles.eyebrow, { color: colors.accent }]}>PLAN WITH CARE</Text>
                                <Text style={[styles.pageTitle, { color: colors.foreground }]}>Mount Megatong</Text>
                                <Text style={[styles.pageDescription, { color: colors.secondary }]}>
                                    A few thoughtful checks can help you have a safer, more enjoyable hike.
                                </Text>
                            </View>

                            <View style={styles.guideHero}>
                                <Image
                                    accessibilityLabel="Mountain landscape for the Mount Megatong trail guide"
                                    resizeMode="cover"
                                    source={require('../../assets/images/Starting_page2.jpg')}
                                    style={styles.guideImage}
                                />
                                <LinearGradient
                                    colors={['transparent', 'rgba(0,0,0,0.82)']}
                                    style={styles.guideGradient}
                                />
                                <View style={styles.guideImageLabel}>
                                    <Text style={styles.guideImageLabelText}>MOUNT MEGATONG</Text>
                                </View>
                            </View>

                            <View style={[styles.noticeCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                                <Text style={[styles.noticeEyebrow, { color: colors.accent }]}>LOCAL TRAIL INFORMATION</Text>
                                <Text style={[styles.noticeTitle, { color: colors.foreground }]}>Confirm the details before you go.</Text>
                                <Text style={[styles.noticeBody, { color: colors.secondary }]}>
                                    Trail distance, difficulty, access, and conditions can change. Check with local guides or the relevant local office for current information.
                                </Text>
                            </View>

                            <Text style={[styles.checklistHeading, { color: colors.foreground }]}>Your pre-hike checklist</Text>
                            <View style={[styles.checklist, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                                <ChecklistItem
                                    number="01"
                                    title="Ask about current conditions"
                                    description="Check the weather, trail access, and any local advisories."
                                />
                                <ChecklistItem
                                    number="02"
                                    title="Plan with a local guide"
                                    description="Confirm your route and allow enough time for your group."
                                />
                                <ChecklistItem
                                    number="03"
                                    title="Pack the essentials"
                                    description="Bring water, suitable footwear, layers, and a charged phone."
                                />
                                <ChecklistItem
                                    number="04"
                                    title="Tell someone your plans"
                                    description="Share where you are going and when you expect to be back."
                                    last
                                />
                            </View>

                            <Pressable
                                accessibilityRole="button"
                                onPress={() => setIsSaved(!isSaved)}
                                style={[
                                    styles.secondaryButton,
                                    { backgroundColor: colors.elevatedSurface, borderColor: colors.border },
                                ]}
                            >
                                <Text style={[styles.secondaryButtonText, { color: colors.foreground }]}>
                                    {isSaved ? 'SAVED TO YOUR LIST' : 'SAVE THIS DESTINATION'}
                                </Text>
                                <Text style={[styles.secondaryButtonArrow, { color: colors.accent }, isSaved && styles.savedIcon]}>
                                    {isSaved ? '♥' : '♡'}
                                </Text>
                            </Pressable>
                        </>
                    )}

                    {activeTab === 'Saved' && (
                        <>
                            <View style={styles.pageIntro}>
                                <Text style={[styles.eyebrow, { color: colors.accent }]}>YOUR COLLECTION</Text>
                                <Text style={[styles.pageTitle, { color: colors.foreground }]}>Saved destination</Text>
                                <Text style={[styles.pageDescription, { color: colors.secondary }]}>
                                    Keep Mount Megatong close while you plan your next hike.
                                </Text>
                            </View>
                            {isSaved ? (
                                <Pressable
                                    accessibilityRole="button"
                                    onPress={() => setActiveTab('Trail Guide')}
                                    style={[
                                        styles.savedDestinationCard,
                                        { backgroundColor: colors.surface, borderColor: colors.border },
                                    ]}
                                >
                                    <Image
                                        accessibilityLabel="Mountain destination"
                                        resizeMode="cover"
                                        source={require('../../assets/images/fpasspic.png')}
                                        style={styles.savedDestinationImage}
                                    />
                                    <View style={styles.savedDestinationCopy}>
                                        <Text style={[styles.sectionEyebrow, { color: colors.subtle }]}>YOUR NEXT ADVENTURE</Text>
                                        <Text style={[styles.savedDestinationName, { color: colors.foreground }]}>Mount Megatong</Text>
                                        <Text style={[styles.savedDestinationLink, { color: colors.accent }]}>OPEN TRAIL GUIDE  →</Text>
                                    </View>
                                    <Text style={[styles.savedHeart, { color: colors.accent }]}>♥</Text>
                                </Pressable>
                            ) : (
                                <View style={[styles.emptyState, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                                    <Text style={[styles.emptyIcon, { color: colors.accent }]}>♡</Text>
                                    <Text style={[styles.emptyTitle, { color: colors.foreground }]}>Nothing saved just yet</Text>
                                    <Text style={[styles.emptyDescription, { color: colors.secondary }]}>
                                        Save Mount Megatong from Home or the Trail Guide to keep it here.
                                    </Text>
                                    <Pressable
                                        accessibilityRole="button"
                                        onPress={() => setActiveTab('Home')}
                                        style={styles.emptyButton}
                                    >
                                        <Text style={styles.emptyButtonText}>BACK TO HOME</Text>
                                    </Pressable>
                                </View>
                            )}
                        </>
                    )}
                </ScrollView>

                <View style={[styles.bottomBar, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
                    {(['Home', 'Map', 'Trail Guide', 'Saved'] as const).map((tab) => {
                        const selected = activeTab === tab;
                        const icon =
                            tab === 'Home'
                                ? '⌂'
                                : tab === 'Map'
                                  ? '⌖'
                                  : tab === 'Trail Guide'
                                    ? '↗'
                                    : '♡';
                        return (
                            <Pressable
                                accessibilityRole="button"
                                accessibilityState={{ selected }}
                                key={tab}
                                onPress={() =>
                                    tab === 'Map'
                                        ? router.push('/mappage')
                                        : setActiveTab(tab)
                                }
                                style={styles.navItem}
                            >
                                <Text style={[styles.navIcon, { color: colors.subtle }, selected && { color: colors.accent }]}>
                                    {icon}
                                </Text>
                                <Text style={[styles.navLabel, { color: colors.subtle }, selected && { color: colors.accent }]}>
                                    {tab}
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>
            </View>
        </SafeAreaView>
    );
};

type ChecklistItemProps = {
    number: string;
    title: string;
    description: string;
    last?: boolean;
};

const ChecklistItem = ({ number, title, description, last = false }: ChecklistItemProps) => {
    const { colors } = useTheme();

    return (
    <View style={[styles.checklistItem, { borderBottomColor: colors.border }, last && styles.lastChecklistItem]}>
        <Text style={[styles.checklistNumber, { color: colors.accent }]}>{number}</Text>
        <View style={styles.checklistCopy}>
            <Text style={[styles.checklistTitle, { color: colors.foreground }]}>{title}</Text>
            <Text style={[styles.checklistDescription, { color: colors.secondary }]}>{description}</Text>
        </View>
    </View>
    );
};

export default Homepage;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#080A08',
    },
    page: {
        flex: 1,
        backgroundColor: '#080A08',
    },
    scrollContent: {
        paddingBottom: 26,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: 10,
    },
    wordmark: {
        fontSize: 27,
        fontWeight: '900',
        letterSpacing: 0.5,
    },
    wordmarkLight: {
        color: '#FFFFFF',
    },
    wordmarkGreen: {
        color: '#19F000',
    },
    headerCaption: {
        marginTop: -3,
        color: '#888D87',
        fontSize: 8,
        fontWeight: '700',
        letterSpacing: 1.5,
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 9,
    },
    settingsBadge: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#293229',
        borderRadius: 20,
        backgroundColor: '#151A15',
    },
    settingsIcon: {
        color: '#19F000',
        fontSize: 20,
    },
    profileBadge: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#293229',
        borderRadius: 20,
        backgroundColor: '#151A15',
    },
    profileInitials: {
        color: '#19F000',
        fontSize: 15,
        fontWeight: '800',
    },
    intro: {
        paddingHorizontal: 24,
        marginTop: 27,
    },
    eyebrow: {
        color: '#19F000',
        fontSize: 9,
        fontWeight: '800',
        letterSpacing: 1.7,
    },
    introTitle: {
        marginTop: 8,
        color: '#FFFFFF',
        fontSize: 29,
        fontWeight: '800',
        lineHeight: 35,
        letterSpacing: -0.5,
    },
    introBody: {
        marginTop: 8,
        color: '#A0A49F',
        fontSize: 12,
    },
    destinationCard: {
        height: 315,
        marginHorizontal: 20,
        marginTop: 22,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#2A312A',
        borderRadius: 22,
        backgroundColor: '#161B16',
    },
    destinationImage: {
        ...StyleSheet.absoluteFill,
        width: '100%',
        height: '100%',
    },
    destinationGradient: {
        ...StyleSheet.absoluteFill,
    },
    destinationTopRow: {
        position: 'absolute',
        top: 14,
        right: 14,
        left: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    destinationTag: {
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
        paddingHorizontal: 11,
        borderRadius: 16,
        backgroundColor: 'rgba(8, 10, 8, 0.75)',
    },
    tagDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#19F000',
    },
    destinationTagText: {
        color: '#F2F4F1',
        fontSize: 8,
        fontWeight: '800',
        letterSpacing: 0.9,
    },
    saveButton: {
        width: 38,
        height: 38,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.25)',
        borderRadius: 20,
        backgroundColor: 'rgba(8,10,8,0.62)',
    },
    saveIcon: {
        color: '#FFFFFF',
        fontSize: 23,
        lineHeight: 26,
    },
    savedIcon: {
        color: '#19F000',
    },
    destinationCopy: {
        position: 'absolute',
        right: 18,
        bottom: 18,
        left: 18,
    },
    destinationEyebrow: {
        color: '#D5E4D1',
        fontSize: 8,
        fontWeight: '800',
        letterSpacing: 1.6,
    },
    destinationName: {
        marginTop: 5,
        color: '#FFFFFF',
        fontSize: 29,
        fontWeight: '800',
        letterSpacing: -0.5,
    },
    destinationDescription: {
        marginTop: 3,
        color: '#E1E4E0',
        fontSize: 11,
    },
    primaryButton: {
        height: 42,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
        gap: 12,
        marginTop: 14,
        paddingHorizontal: 15,
        borderRadius: 11,
        backgroundColor: '#19F000',
    },
    buttonPressed: {
        opacity: 0.78,
    },
    primaryButtonText: {
        color: '#071006',
        fontSize: 9,
        fontWeight: '900',
        letterSpacing: 0.6,
    },
    primaryButtonArrow: {
        color: '#071006',
        fontSize: 16,
        fontWeight: '700',
    },
    sectionHeading: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        marginTop: 27,
        marginBottom: 13,
    },
    sectionEyebrow: {
        color: '#7D847C',
        fontSize: 9,
        fontWeight: '800',
        letterSpacing: 1.4,
    },
    sectionTitle: {
        marginTop: 4,
        color: '#FFFFFF',
        fontSize: 19,
        fontWeight: '700',
    },
    sectionDecoration: {
        color: '#19F000',
        fontSize: 20,
    },
    tipCard: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 9,
        padding: 13,
        borderWidth: 1,
        borderColor: '#242A24',
        borderRadius: 14,
        backgroundColor: '#111411',
    },
    tipIconWrap: {
        width: 38,
        height: 38,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
        borderRadius: 12,
        backgroundColor: '#1A2618',
    },
    tipIcon: {
        color: '#19F000',
        fontSize: 21,
    },
    tipCopy: {
        flex: 1,
    },
    tipTitle: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '700',
    },
    tipBody: {
        marginTop: 4,
        color: '#999F98',
        fontSize: 10,
        lineHeight: 15,
    },
    secondaryButton: {
        height: 46,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        marginHorizontal: 20,
        marginTop: 8,
        borderWidth: 1,
        borderColor: '#394338',
        borderRadius: 12,
        backgroundColor: '#141914',
    },
    secondaryButtonText: {
        color: '#E7EAE5',
        fontSize: 9,
        fontWeight: '800',
        letterSpacing: 0.7,
    },
    secondaryButtonArrow: {
        color: '#19F000',
        fontSize: 17,
        fontWeight: '700',
    },
    pageIntro: {
        paddingHorizontal: 24,
        marginTop: 27,
        marginBottom: 20,
    },
    pageTitle: {
        marginTop: 7,
        color: '#FFFFFF',
        fontSize: 27,
        fontWeight: '800',
        letterSpacing: -0.5,
    },
    pageDescription: {
        marginTop: 7,
        color: '#A0A49F',
        fontSize: 12,
        lineHeight: 18,
    },
    guideHero: {
        height: 190,
        marginHorizontal: 20,
        overflow: 'hidden',
        borderRadius: 18,
        backgroundColor: '#161B16',
    },
    guideImage: {
        ...StyleSheet.absoluteFill,
        width: '100%',
        height: '100%',
    },
    guideGradient: {
        ...StyleSheet.absoluteFill,
    },
    guideImageLabel: {
        position: 'absolute',
        bottom: 14,
        left: 15,
        paddingHorizontal: 11,
        paddingVertical: 7,
        borderRadius: 14,
        backgroundColor: 'rgba(0,0,0,0.62)',
    },
    guideImageLabelText: {
        color: '#FFFFFF',
        fontSize: 9,
        fontWeight: '800',
        letterSpacing: 1.1,
    },
    noticeCard: {
        marginHorizontal: 20,
        marginTop: 17,
        padding: 16,
        borderWidth: 1,
        borderColor: '#354333',
        borderRadius: 15,
        backgroundColor: '#141B13',
    },
    noticeEyebrow: {
        color: '#19F000',
        fontSize: 8,
        fontWeight: '800',
        letterSpacing: 1.4,
    },
    noticeTitle: {
        marginTop: 7,
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
    noticeBody: {
        marginTop: 6,
        color: '#AEB5AB',
        fontSize: 11,
        lineHeight: 17,
    },
    checklistHeading: {
        marginHorizontal: 24,
        marginTop: 23,
        marginBottom: 7,
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
    checklist: {
        marginHorizontal: 20,
        paddingHorizontal: 14,
        paddingTop: 4,
        borderWidth: 1,
        borderColor: '#252B25',
        borderRadius: 15,
        backgroundColor: '#111411',
    },
    checklistItem: {
        flexDirection: 'row',
        paddingVertical: 14,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#2A302A',
    },
    lastChecklistItem: {
        borderBottomWidth: 0,
    },
    checklistNumber: {
        width: 35,
        paddingTop: 1,
        color: '#19F000',
        fontSize: 10,
        fontWeight: '800',
    },
    checklistCopy: {
        flex: 1,
    },
    checklistTitle: {
        color: '#F2F4F1',
        fontSize: 12,
        fontWeight: '700',
    },
    checklistDescription: {
        marginTop: 4,
        color: '#929991',
        fontSize: 10,
        lineHeight: 15,
    },
    savedDestinationCard: {
        marginHorizontal: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#282D28',
        borderRadius: 16,
        backgroundColor: '#121512',
    },
    savedDestinationImage: {
        width: '100%',
        height: 175,
    },
    savedDestinationCopy: {
        paddingHorizontal: 15,
        paddingTop: 13,
        paddingBottom: 16,
    },
    savedDestinationName: {
        marginTop: 5,
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
    },
    savedDestinationLink: {
        marginTop: 10,
        color: '#19F000',
        fontSize: 9,
        fontWeight: '800',
        letterSpacing: 0.8,
    },
    savedHeart: {
        position: 'absolute',
        top: 12,
        right: 13,
        color: '#19F000',
        fontSize: 23,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginTop: 8,
        paddingHorizontal: 22,
        paddingVertical: 34,
        borderWidth: 1,
        borderColor: '#252B25',
        borderRadius: 16,
        backgroundColor: '#111411',
    },
    emptyIcon: {
        color: '#19F000',
        fontSize: 31,
    },
    emptyTitle: {
        marginTop: 8,
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
    },
    emptyDescription: {
        marginTop: 5,
        color: '#969C95',
        fontSize: 11,
        lineHeight: 16,
        textAlign: 'center',
    },
    emptyButton: {
        marginTop: 17,
        paddingHorizontal: 15,
        paddingVertical: 11,
        borderRadius: 10,
        backgroundColor: '#19F000',
    },
    emptyButtonText: {
        color: '#071006',
        fontSize: 9,
        fontWeight: '900',
        letterSpacing: 0.6,
    },
    bottomBar: {
        minHeight: 64,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: '#2A302A',
        backgroundColor: '#0D100D',
    },
    navItem: {
        minWidth: 68,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        paddingVertical: 6,
    },
    navIcon: {
        color: '#777E76',
        fontSize: 20,
        lineHeight: 23,
    },
    selectedNavIcon: {
        color: '#19F000',
    },
    navLabel: {
        color: '#777E76',
        fontSize: 9,
        fontWeight: '600',
    },
    selectedNavLabel: {
        color: '#19F000',
    },
});
