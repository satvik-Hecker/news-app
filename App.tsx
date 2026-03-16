import React, { useMemo, useState, useEffect } from "react";
import {
  Animated,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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
          <Text style={styles.cardCategory}>{article.category}</Text>
          <Text style={styles.cardTime}>{article.time}</Text>
        </View>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {article.title}
        </Text>
        <Text style={styles.cardDescription} numberOfLines={3}>
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
        activeOpacity={0.8}
        onPress={() => setSelectedCategory(category)}
        style={[
          styles.chip,
          isActive && styles.chipActive,
        ]}
      >
        <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
          {category}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderArticle = ({ item, index }: { item: Article; index: number }) => {
    return <ArticleCard article={item} index={index} />;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.appLabel}>Today</Text>
            <Text style={styles.appTitle}>AmberBrief</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>N</Text>
          </View>
        </View>

        <Text style={styles.subTitle}>Stay updated with the latest stories.</Text>

        <View style={styles.chipRow}>
          <FlatList
            data={CATEGORIES}
            keyExtractor={(item) => item}
            renderItem={({ item }) => renderCategoryChip(item)}
            horizontal
            showsHorizontalScrollIndicator={false}
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
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f4f4f5",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
appLabel: {
    fontSize: 14,
    color: "#71717a",
    fontFamily: "monospace",
  },
  appTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#18181b",
    fontFamily: "monospace",
  },
  avatarText: {
    color: "#ffffff",
    fontWeight: "600",
    fontFamily: "monospace",
  },
  subTitle: {
    fontSize: 14,
    color: "#71717a",
    marginBottom: 16,
    fontFamily: "monospace",
    letterSpacing: 0.3,
  },
  chipText: {
    fontSize: 13,
    color: "#52525b",
    fontFamily: "monospace",
    letterSpacing: 0.5,
  },
  chipTextActive: {
    color: "#ffffff",
    fontWeight: "600",
    fontFamily: "monospace",
    letterSpacing: 0.5,
  },
  appTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#18181b",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#d97706",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  subTitle: {
    fontSize: 14,
    color: "#71717a",
    marginBottom: 16,
  },
  chipRow: {
    marginBottom: 12,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: "#e4e4e7",
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: "#d97706",
  },
  chipText: {
    fontSize: 13,
    color: "#52525b",
  },
  chipTextActive: {
    color: "#ffffff",
    fontWeight: "600",
  },
listContent: {
    paddingBottom: 24,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    marginBottom: 14,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
  },
  cardImage: {
    width: "100%",
    height: 150,
  },
  cardContent: {
    padding: 12,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  cardCategory: {
    fontSize: 11,
    fontWeight: "600",
    color: "#d97706",
    textTransform: "uppercase",
    fontFamily: "monospace",
    letterSpacing: 1,
  },
  cardTime: {
    fontSize: 11,
    color: "#a1a1aa",
    fontFamily: "monospace",
    letterSpacing: 0.5,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#18181b",
    marginBottom: 4,
    fontFamily: "monospace",
    lineHeight: 20,
  },
  cardDescription: {
    fontSize: 12,
    color: "#71717a",
    fontFamily: "monospace",
    lineHeight: 18,
  },
});

export default App;