import React, { useMemo, useState, useEffect } from "react";
import {
  Animated,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const MONO_FONT = Platform.OS === "ios" ? "Menlo" : "monospace";

type Category = "All" | "Technology" | "Sports" | "Business" | "World";

type Article = {
  id: string;
  title: string;
  description: string;
  category: Category;
  image: string;
  time: string;
};

const CATEGORIES: Category[] = ["All", "Technology", "Sports", "Business", "World"];

const MOCK_NEWS: Article[] = [
  {
    id: "1",
    title: "New AI Model Changes the Game",
    description: "Researchers release a breakthrough model pushing the limits of language understanding.",
    category: "Technology",
    image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
    time: "2h ago",
  },
  {
    id: "2",
    title: "Local Team Secures Last-Minute Victory",
    description: "In a nail‑biting finish, fans witness one of the most dramatic endings this season.",
    category: "Sports",
    image: "https://images.pexels.com/photos/399187/pexels-photo-399187.jpeg",
    time: "30m ago",
  },
  {
    id: "3",
    title: "Markets Rally After Positive Earnings",
    description: "Investors respond optimistically as major companies report stronger‑than‑expected profits.",
    category: "Business",
    image: "https://images.pexels.com/photos/210607/pexels-photo-210607.jpeg",
    time: "4h ago",
  },
  {
    id: "4",
    title: "Global Leaders Meet for Climate Summit",
    description: "Key decisions are expected as countries negotiate aggressive climate targets.",
    category: "World",
    image: "https://images.pexels.com/photos/87009/pexels-photo-87009.jpeg",
    time: "1d ago",
  },
  {
    id: "5",
    title: "Startups Race to Build the Next Super App",
    description: "From messaging to payments, companies fight to become the all‑in‑one platform.",
    category: "Technology",
    image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
    time: "3h ago",
  },
];

const COLORS = {
  amber: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
  },
  zinc: {
    50: "#fafafa",
    100: "#f4f4f5",
    200: "#e4e4e7",
    300: "#d4d4d8",
    400: "#a1a1aa",
    500: "#71717a",
    600: "#52525b",
    700: "#3f3f46",
    800: "#27272a",
    900: "#18181b",
  },
};

type ArticleCardProps = {
  article: Article;
  index: number;
};

const ArticleCard: React.FC<ArticleCardProps> = ({ article, index }) => {
  const translateY = useMemo(() => new Animated.Value(20), []);
  const opacity = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 350,
        delay: index * 80,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 350,
        delay: index * 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, [index, opacity, translateY]);

  return (
    <Animated.View
      style={[
        styles.card,
        {
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <Image source={{ uri: article.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <View style={styles.cardHeaderRow}>
          <View style={styles.categoryBadge}>
            <Text style={styles.cardCategory}>{article.category}</Text>
          </View>
          <Text style={styles.cardTime}>{article.time}</Text>
        </View>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {article.title}
        </Text>
        <Text style={styles.cardDescription} numberOfLines={2}>
          {article.description}
        </Text>
      </View>
    </Animated.View>
  );
};

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");

  const filteredNews = useMemo(() => {
    if (selectedCategory === "All") return MOCK_NEWS;
    return MOCK_NEWS.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const renderCategoryChip = (category: Category) => {
    const isActive = category === selectedCategory;
    return (
      <TouchableOpacity
        key={category}
        activeOpacity={0.7}
        onPress={() => setSelectedCategory(category)}
        style={[
          styles.chip,
          isActive && styles.chipActive,
        ]}
      >
        <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
          {category.toUpperCase()}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderArticle = ({ item, index }: { item: Article; index: number }) => {
    return <ArticleCard article={item} index={index} />;
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.zinc[200]} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View>
              <Text style={styles.appLabel}>MONDAY, MAR 16</Text>
              <Text style={styles.appTitle}>AMBERBRIEF</Text>
            </View>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>A</Text>
            </View>
          </View>

          <Text style={styles.subTitle}>Your daily briefing on the stories that matter.</Text>

          <View style={styles.chipRow}>
            <FlatList
              data={CATEGORIES}
              keyExtractor={(item) => item}
              renderItem={({ item }) => renderCategoryChip(item)}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.chipListContent}
            />
          </View>

          <FlatList
            data={filteredNews}
            keyExtractor={(item) => item.id}
            renderItem={renderArticle}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.zinc[300],
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.zinc[300],
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingTop: 16,
    marginBottom: 4,
  },
  appLabel: {
    fontSize: 11,
    fontFamily: MONO_FONT,
    color: COLORS.zinc[500],
    letterSpacing: 2,
    marginBottom: 2,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: "800",
    fontFamily: MONO_FONT,
    color: COLORS.zinc[900],
    letterSpacing: 1,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: COLORS.amber[600],
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.amber[600],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarText: {
    color: COLORS.zinc[50],
    fontSize: 18,
    fontWeight: "700",
    fontFamily: MONO_FONT,
  },
  subTitle: {
    fontSize: 13,
    fontFamily: MONO_FONT,
    color: COLORS.zinc[500],
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  chipRow: {
    marginBottom: 8,
  },
  chipListContent: {
    paddingRight: 20,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: COLORS.zinc[200],
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.zinc[300],
  },
  chipActive: {
    backgroundColor: COLORS.amber[600],
    borderColor: COLORS.amber[600],
  },
  chipText: {
    fontSize: 11,
    fontFamily: MONO_FONT,
    fontWeight: "600",
    color: COLORS.zinc[600],
    letterSpacing: 1.5,
  },
  chipTextActive: {
    color: COLORS.zinc[50],
  },
  listContent: {
    paddingBottom: 32,
  },
  card: {
    backgroundColor: COLORS.zinc[100],
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.zinc[200],
  },
  cardImage: {
    width: "100%",
    height: 140,
    backgroundColor: COLORS.zinc[200],
  },
  cardContent: {
    padding: 16,
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  categoryBadge: {
    backgroundColor: COLORS.amber[100],
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  cardCategory: {
    fontSize: 10,
    fontWeight: "700",
    fontFamily: MONO_FONT,
    color: COLORS.amber[700],
    letterSpacing: 1.5,
  },
  cardTime: {
    fontSize: 11,
    fontFamily: MONO_FONT,
    color: COLORS.zinc[400],
    letterSpacing: 0.5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: MONO_FONT,
    color: COLORS.zinc[900],
    marginBottom: 6,
    lineHeight: 21,
  },
  cardDescription: {
    fontSize: 13,
    fontFamily: MONO_FONT,
    color: COLORS.zinc[500],
    lineHeight: 18,
    letterSpacing: 0.3,
  },
});

export default App;
