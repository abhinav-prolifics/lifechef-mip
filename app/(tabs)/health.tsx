import { useState } from 'react';
import { StyleSheet, ScrollView, View, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { ThemedView, Card } from '@/components/ThemedView';
import { ThemedText, Title, Subtitle, Caption } from '@/components/ThemedText';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import ProgressCircle from '@/components/ProgressCircle';
import { Clipboard, CirclePlus as PlusCircle, TrendingUp, Weight, SquareActivity as ActivitySquare, Heart, ChevronRight, CalendarDays } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';

export default function HealthScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const [activeTab, setActiveTab] = useState('overview');

  // Stubbed health data
  const healthData = {
    weight: {
      current: 185.2,
      previousWeek: 187.5,
      goal: 175,
      unit: 'lbs',
      lastUpdated: '2 days ago',
      progress: 0.65,
      history: [190, 188, 187.5, 187, 186, 185.2],
    },
    glucose: {
      current: 105,
      previousWeek: 115,
      goal: 100,
      unit: 'mg/dL',
      lastUpdated: '5 hours ago',
      progress: 0.7,
      history: [118, 115, 110, 108, 106, 105],
    },
    bloodPressure: {
      current: '120/80',
      previousWeek: '125/85',
      goal: '120/80',
      lastUpdated: '1 day ago',
      progress: 0.85,
      history: ['125/85', '123/83', '122/82', '121/81', '120/80'],
    },
    nextAppointment: {
      type: 'Dietitian Check-in',
      date: 'June 15, 2025',
      time: '10:00 AM',
      provider: 'Dr. Sarah Johnson',
    },
    devices: [
      {
        id: 1,
        name: 'Bluetooth Scale',
        connected: true,
        lastSync: '2 days ago',
        image: 'https://images.pexels.com/photos/4498482/pexels-photo-4498482.jpeg',
      },
      {
        id: 2,
        name: 'Glucose Monitor',
        connected: true,
        lastSync: '5 hours ago',
        image: 'https://images.pexels.com/photos/7108298/pexels-photo-7108298.jpeg',
      },
      {
        id: 3,
        name: 'Blood Pressure Monitor',
        connected: true,
        lastSync: '1 day ago',
        image: 'https://images.pexels.com/photos/9058556/pexels-photo-9058556.jpeg',
      },
    ],
  };

  // Render a health metric card
  const renderHealthMetric = (title: any, data: any, icon: any, color: any) => (
    <Card style={styles.metricCard}>
      <View style={styles.metricHeader}>
        <View style={[styles.metricIconContainer, { backgroundColor: color }]}>
          {icon}
        </View>
        <View>
          <Subtitle>{title}</Subtitle>
          <Caption>Last updated {data.lastUpdated}</Caption>
        </View>
      </View>

      <View style={styles.metricContent}>
        <View>
          <ThemedText style={styles.currentValue}>
            {data.current} <Caption>{data.unit}</Caption>
          </ThemedText>
          <View style={styles.previousContainer}>
            <TrendingUp size={14} color={data.current < data.previousWeek ? colors.success : colors.error} />
            <Caption style={{ color: data.current < data.previousWeek ? colors.success : colors.error }}>
              {data.current < data.previousWeek ? 'Down' : 'Up'} from {data.previousWeek} {data.unit}
            </Caption>
          </View>
        </View>
        <ProgressCircle
          size={70}
          progress={data.progress}
          showPercentage={false}
          label={`${Math.round(data.progress * 100)}%`}
        />
      </View>

      <View style={styles.metricFooter}>
        <Caption>Goal: {data.goal} {data.unit}</Caption>
        <Button
          title="View History"
          onPress={() => { }}
          variant="text"
          size="small"
          style={{ padding: 0 }}
        />
      </View>
    </Card>
  );

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <SafeAreaView>
          {/* Tab Selector */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              onPress={() => setActiveTab('overview')}
              style={[
                styles.tab,
                activeTab === 'overview' && { borderBottomColor: colors.primary },
              ]}
            >
              <ThemedText
                style={[
                  styles.tabText,
                  activeTab === 'overview' && { color: colors.primary, fontFamily: 'Inter-SemiBold' },
                ]}
              >
                Overview
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTab('devices')}
              style={[
                styles.tab,
                activeTab === 'devices' && { borderBottomColor: colors.primary },
              ]}
            >
              <ThemedText
                style={[
                  styles.tabText,
                  activeTab === 'devices' && { color: colors.primary, fontFamily: 'Inter-SemiBold' },
                ]}
              >
                My Devices
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setActiveTab('reports')}
              style={[
                styles.tab,
                activeTab === 'reports' && { borderBottomColor: colors.primary },
              ]}
            >
              <ThemedText
                style={[
                  styles.tabText,
                  activeTab === 'reports' && { color: colors.primary, fontFamily: 'Inter-SemiBold' },
                ]}
              >
                Reports
              </ThemedText>
            </TouchableOpacity>
          </View>

          {activeTab === 'overview' && (
            <>
              {/* Add Health Data Button */}
              <TouchableOpacity style={[styles.addDataButton, { borderColor: colors.primary }]}>
                <PlusCircle size={20} color={colors.primary} style={styles.addDataIcon} />
                <ThemedText style={[styles.addDataText, { color: colors.primary }]}>
                  Add Health Data Manually
                </ThemedText>
              </TouchableOpacity>

              {/* Health Metrics */}
              {renderHealthMetric(
                'Weight',
                healthData.weight,
                <Weight size={18} color="#FFFFFF" />,
                colors.primary
              )}

              {renderHealthMetric(
                'Blood Glucose',
                healthData.glucose,
                <ActivitySquare size={18} color="#FFFFFF" />,
                colors.secondary
              )}

              {renderHealthMetric(
                'Blood Pressure',
                healthData.bloodPressure,
                <Heart size={18} color="#FFFFFF" />,
                colors.accent
              )}

              {/* Upcoming Appointment */}
              <Card style={styles.appointmentCard}>
                <View style={styles.appointmentHeader}>
                  <View style={[styles.appointmentIconContainer, { backgroundColor: colors.tertiary }]}>
                    <CalendarDays size={18} color="#FFFFFF" />
                  </View>
                  <View>
                    <Subtitle>Upcoming Appointment</Subtitle>
                    <Caption>{healthData.nextAppointment.type}</Caption>
                  </View>
                </View>

                <View style={styles.appointmentDetails}>
                  <View style={styles.appointmentDetail}>
                    <ThemedText style={styles.appointmentLabel}>Date:</ThemedText>
                    <ThemedText>{healthData.nextAppointment.date}</ThemedText>
                  </View>
                  <View style={styles.appointmentDetail}>
                    <ThemedText style={styles.appointmentLabel}>Time:</ThemedText>
                    <ThemedText>{healthData.nextAppointment.time}</ThemedText>
                  </View>
                  <View style={styles.appointmentDetail}>
                    <ThemedText style={styles.appointmentLabel}>Provider:</ThemedText>
                    <ThemedText>{healthData.nextAppointment.provider}</ThemedText>
                  </View>
                </View>

                <View style={styles.appointmentActions}>
                  <Button
                    title="Reschedule"
                    onPress={() => { }}
                    variant="outline"
                    size="small"
                    style={styles.appointmentButton}
                  />
                  <Button
                    title="Join Call"
                    onPress={() => { }}
                    size="small"
                    style={styles.appointmentButton}
                  />
                </View>
              </Card>
            </>
          )}

          {activeTab === 'devices' && (
            <>
              <View style={styles.devicesHeader}>
                <Subtitle>Connected Devices</Subtitle>
                <Button
                  title="Add Device"
                  onPress={() => { }}
                  variant="outline"
                  size="small"
                  icon={<PlusCircle size={16} color={colors.primary} />}
                />
              </View>

              {healthData.devices.map(device => (
                <Card key={device.id} style={styles.deviceCard}>
                  <View style={styles.deviceContent}>
                    <Image source={{ uri: device.image }} style={styles.deviceImage} />
                    <View style={styles.deviceInfo}>
                      <ThemedText style={styles.deviceName}>{device.name}</ThemedText>
                      <View style={styles.deviceStatus}>
                        <View
                          style={[
                            styles.statusIndicator,
                            { backgroundColor: device.connected ? colors.success : colors.error }
                          ]}
                        />
                        <Caption>
                          {device.connected ? 'Connected' : 'Disconnected'} · Last sync {device.lastSync}
                        </Caption>
                      </View>
                    </View>
                    <ChevronRight size={20} color={colors.placeholder} />
                  </View>
                </Card>
              ))}

              <Card style={styles.syncCard}>
              <View style={styles.cardWrapper}>
                <View style={styles.syncCardContent}>
                  <View style={{ flex: 1, marginRight: 12 }}>
                    <Subtitle>Auto-Sync Data</Subtitle>
                    <Caption>All your devices sync automatically every hour</Caption>
                  </View>
                  <Button
                    title="Sync Now"
                    onPress={() => {}}
                    size="small"
                  />
                </View>
              </View>
              </Card>
            </>
          )}

          {activeTab === 'reports' && (
            <>
              <Subtitle style={styles.reportsTitle}>Health Reports</Subtitle>
              <Caption style={styles.reportsSubtitle}>
                View, download or share your health reports
              </Caption>

              <View style={styles.reportsList}>
                <TouchableOpacity style={styles.reportItem}>
                  <View style={[styles.reportIcon, { backgroundColor: colors.primary }]}>
                    <Clipboard size={18} color="#FFFFFF" />
                  </View>
                  <View style={styles.reportInfo}>
                    <ThemedText style={styles.reportName}>Monthly Progress Report</ThemedText>
                    <Caption>May 2025 · PDF · 2.3 MB</Caption>
                  </View>
                  <ChevronRight size={20} color={colors.placeholder} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.reportItem}>
                  <View style={[styles.reportIcon, { backgroundColor: colors.primary }]}>
                    <Clipboard size={18} color="#FFFFFF" />
                  </View>
                  <View style={styles.reportInfo}>
                    <ThemedText style={styles.reportName}>Weight Tracking Summary</ThemedText>
                    <Caption>Last 3 months · PDF · 1.8 MB</Caption>
                  </View>
                  <ChevronRight size={20} color={colors.placeholder} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.reportItem}>
                  <View style={[styles.reportIcon, { backgroundColor: colors.primary }]}>
                    <Clipboard size={18} color="#FFFFFF" />
                  </View>
                  <View style={styles.reportInfo}>
                    <ThemedText style={styles.reportName}>Nutritional Analysis</ThemedText>
                    <Caption>April 2025 · PDF · 3.1 MB</Caption>
                  </View>
                  <ChevronRight size={20} color={colors.placeholder} />
                </TouchableOpacity>
              </View>

              <Button
                title="Request Custom Report"
                onPress={() => { }}
                variant="outline"
                fullWidth
                style={styles.requestReportButton}
              />
            </>
          )}
        </SafeAreaView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontSize: 16,
  },
  addDataButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  addDataIcon: {
    marginRight: 8,
  },
  addDataText: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
  },
  metricCard: {
    marginBottom: 16,
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  metricIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  metricContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  currentValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    fontFamily: 'Inter-Bold',
  },
  previousContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appointmentCard: {
    marginBottom: 16,
  },
  appointmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  appointmentIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  appointmentDetails: {
    marginBottom: 16,
  },
  appointmentDetail: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  appointmentLabel: {
    width: 80,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
  },
  appointmentActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  appointmentButton: {
    marginLeft: 8,
  },
  devicesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  deviceCard: {
    marginBottom: 12,
  },
  deviceContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deviceImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  deviceInfo: {
    flex: 1,
  },
  deviceName: {
    fontWeight: '500',
    marginBottom: 4,
    fontFamily: 'Inter-Medium',
  },
  deviceStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  syncCard: {
    marginTop: 8,
    marginBottom: 32,
  },
  cardWrapper: {
  backgroundColor: '#fff',
  padding: 12,
  borderRadius: 10,
  margin: 10,
  elevation: 2, 
  shadowColor: '#000', 
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
},
syncCardContent: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexWrap: 'wrap', 
},
  reportsTitle: {
    marginBottom: 4,
  },
  reportsSubtitle: {
    marginBottom: 16,
  },
  reportsList: {
    marginBottom: 16,
  },
  reportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  reportIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  reportInfo: {
    flex: 1,
  },
  reportName: {
    fontWeight: '500',
    marginBottom: 4,
    fontFamily: 'Inter-Medium',
  },
  requestReportButton: {
    marginBottom: 32,
  },
});