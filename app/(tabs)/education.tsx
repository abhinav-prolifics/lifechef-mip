import { useState } from 'react';
import { StyleSheet, ScrollView, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { ThemedView, Card } from '@/components/ThemedView';
import { ThemedText, Title, Subtitle, Caption } from '@/components/ThemedText';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import { BookOpen, Search, Clock, ChevronRight, CirclePlay as PlayCircle, Video, FileText, Award } from 'lucide-react-native';
import { Apple, Utensils, SquareActivity as ActivitySquare, Brain } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import useColorScheme from '@/hooks/useColorScheme';
import Input from '@/components/Input';

export default function EducationScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme];
  const [activeTab, setActiveTab] = useState('recommended');

  // Stubbed education data
  const educationData = {
    recommended: [
      {
        id: 1,
        title: 'Understanding Portion Control',
        image: 'https://images.pexels.com/photos/7438985/pexels-photo-7438985.jpeg',
        type: 'article',
        duration: '5 min read',
        tags: ['Nutrition', 'Beginner'],
      },
      {
        id: 2,
        title: 'Healthy Cooking Methods',
        image: 'https://images.pexels.com/photos/6287447/pexels-photo-6287447.jpeg',
        type: 'video',
        duration: '12 min',
        tags: ['Cooking', 'Tips'],
      },
      {
        id: 3,
        title: 'Managing Blood Sugar Through Diet',
        image: 'https://images.pexels.com/photos/8325710/pexels-photo-8325710.jpeg',
        type: 'article',
        duration: '8 min read',
        tags: ['Diabetes', 'Nutrition'],
      },
    ],
    popular: [
      {
        id: 4,
        title: 'Heart-Healthy Eating Patterns',
        image: 'https://images.pexels.com/photos/4397840/pexels-photo-4397840.jpeg',
        type: 'video',
        duration: '15 min',
        tags: ['Heart Health', 'Diet'],
      },
      {
        id: 5,
        title: 'Cooking with Less Salt',
        image: 'https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg',
        type: 'article',
        duration: '6 min read',
        tags: ['Sodium', 'Cooking'],
      },
    ],
  };
  
  const categories = [
    { id: 1, name: 'Nutrition', icon: <Apple size={24} color={colors.primary} /> },
    { id: 2, name: 'Recipes', icon: <Utensils size={24} color={colors.primary} /> },
    { id: 3, name: 'Exercise', icon: <ActivitySquare size={24} color={colors.primary} /> },
    { id: 4, name: 'Mental Health', icon: <Brain size={24} color={colors.primary} /> },
  ];

  const renderContentItem = (item:any) => (
    <TouchableOpacity key={item.id} style={styles.contentCard}>
      <Image source={{ uri: item.image }} style={styles.contentImage} />
      <View style={styles.contentTypeContainer}>
        <View 
          style={[
            styles.contentTypeIcon, 
            { 
              backgroundColor: item.type === 'video' ? colors.accent : colors.primary 
            }
          ]}
        >
          {item.type === 'video' ? (
            <Video size={14} color="#FFFFFF" />
          ) : (
            <FileText size={14} color="#FFFFFF" />
          )}
        </View>
      </View>
      
      <View style={styles.contentDetails}>
        <ThemedText style={styles.contentTitle}>{item.title}</ThemedText>
        
        <View style={styles.contentMeta}>
          <Clock size={14} color={colors.placeholder} style={styles.contentMetaIcon} />
          <Caption>{item.duration}</Caption>
        </View>
        
        <View style={styles.tagsContainer}>
          {item.tags.map((tag:any, index:number) => (
            <Badge 
              key={index} 
              label={tag} 
              variant={index % 2 === 0 ? 'primary' : 'info'} 
              size="small" 
              style={styles.tagBadge}
            />
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Search Bar */}
        <Input
          placeholder="Search for topics..."
          leftIcon={<Search size={20} color={colors.placeholder} />}
          containerStyle={styles.searchContainer}
        />
        
        {/* Featured Content */}
        <Card style={styles.featuredCard}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/3772509/pexels-photo-3772509.jpeg' }} 
            style={styles.featuredImage} 
          />
          <View style={styles.featuredContent}>
            <Badge label="Featured" variant="primary" size="small" style={styles.featuredBadge} />
            <Subtitle style={styles.featuredTitle}>Understanding Your Nutritional Needs</Subtitle>
            <Caption style={styles.featuredDescription}>
              Learn about the essential nutrients your body needs and how to ensure you're getting them through your diet.
            </Caption>
            <Button
              title="Watch Video"
              onPress={() => {}}
              icon={<PlayCircle size={16} color="#FFFFFF" />}
              style={styles.featuredButton}
            />
          </View>
        </Card>
        
        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <Subtitle style={styles.sectionTitle}>Categories</Subtitle>
          <View style={styles.categoriesGrid}>
            {categories.map(category => (
              <TouchableOpacity key={category.id} style={styles.categoryItem}>
                <View style={[styles.categoryIcon, { borderColor: colors.primary }]}>
                  {category.icon}
                </View>
                <ThemedText style={styles.categoryName}>{category.name}</ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Tab Selector */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => setActiveTab('recommended')}
            style={[
              styles.tab,
              activeTab === 'recommended' && { borderBottomColor: colors.primary },
            ]}
          >
            <ThemedText
              style={[
                styles.tabText,
                activeTab === 'recommended' && { color: colors.primary, fontFamily: 'Inter-SemiBold' },
              ]}
            >
              Recommended
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('popular')}
            style={[
              styles.tab,
              activeTab === 'popular' && { borderBottomColor: colors.primary },
            ]}
          >
            <ThemedText
              style={[
                styles.tabText,
                activeTab === 'popular' && { color: colors.primary, fontFamily: 'Inter-SemiBold' },
              ]}
            >
              Popular
            </ThemedText>
          </TouchableOpacity>
        </View>
        
        {/* Content List */}
        <View style={styles.contentContainer}>
          {activeTab === 'recommended' ? (
            educationData.recommended.map(item => renderContentItem(item))
          ) : (
            educationData.popular.map(item => renderContentItem(item))
          )}
        </View>
        
        {/* Courses Card */}
        <Card style={styles.coursesCard}>
          <View style={styles.coursesHeader}>
            <View style={[styles.coursesIconContainer, { backgroundColor: colors.accent }]}>
              <Award size={18} color="#FFFFFF" />
            </View>
            <View>
              <Subtitle>Nutrition Courses</Subtitle>
              <Caption>Complete courses to earn certificates</Caption>
            </View>
          </View>
          
          <View style={styles.coursesList}>
            <TouchableOpacity style={styles.courseItem}>
              <View style={styles.courseProgress}>
                <View style={[styles.progressBar, { backgroundColor: colors.borderColor }]}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { 
                        backgroundColor: colors.primary,
                        width: '75%', 
                      }
                    ]} 
                  />
                </View>
                <Caption>75% complete</Caption>
              </View>
              <ThemedText style={styles.courseName}>Diabetes Management 101</ThemedText>
              <ChevronRight size={18} color={colors.placeholder} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.courseItem}>
              <View style={styles.courseProgress}>
                <View style={[styles.progressBar, { backgroundColor: colors.borderColor }]}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { 
                        backgroundColor: colors.primary,
                        width: '30%', 
                      }
                    ]} 
                  />
                </View>
                <Caption>30% complete</Caption>
              </View>
              <ThemedText style={styles.courseName}>Heart-Healthy Cooking</ThemedText>
              <ChevronRight size={18} color={colors.placeholder} />
            </TouchableOpacity>
          </View>
          
          <Button
            title="View All Courses"
            onPress={() => {}}
            variant="outline"
            fullWidth
            style={styles.viewCoursesButton}
          />
        </Card>
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
  searchContainer: {
    marginBottom: 16,
  },
  featuredCard: {
    padding: 0,
    overflow: 'hidden',
    marginBottom: 24,
  },
  featuredImage: {
    width: '100%',
    height: 180,
  },
  featuredContent: {
    padding: 16,
  },
  featuredBadge: {
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  featuredTitle: {
    marginBottom: 8,
  },
  featuredDescription: {
    marginBottom: 16,
  },
  featuredButton: {
    alignSelf: 'flex-start',
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
  },
  categoryName: {
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
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
  contentContainer: {
    marginBottom: 24,
  },
  contentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  contentImage: {
    width: '100%',
    height: 160,
  },
  contentTypeContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  contentTypeIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentDetails: {
    padding: 16,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    fontFamily: 'Inter-SemiBold',
  },
  contentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contentMetaIcon: {
    marginRight: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagBadge: {
    marginRight: 6,
    marginBottom: 4,
  },
  coursesCard: {
    marginBottom: 32,
  },
  coursesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  coursesIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  coursesList: {
    marginBottom: 16,
  },
  courseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  courseProgress: {
    width: 80,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  courseName: {
    flex: 1,
    marginLeft: 12,
    fontWeight: '500',
    fontFamily: 'Inter-Medium',
  },
  viewCoursesButton: {
    marginTop: 8,
  },
});