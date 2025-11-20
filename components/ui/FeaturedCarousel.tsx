// components/ui/FeaturedCarousel.tsx
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { Image } from 'expo-image';
import { ThemedText } from '@/components/themed-text';

const { width } = Dimensions.get('window');

const featuredItems = [
  { id: '1', category: 'Covoiturage', title: 'Trajet Liberte 6 - Keur Massar', image: require('@/assets/images/convoiturage.jpeg') },
  { id: '2', category: 'Commandes', title: 'Menu le plus commandé', image: require('@/assets/images/commande.jpeg') },
  { id: '3', category: 'Salle de gym', title: 'Salle la plus fréquentée', image: require('@/assets/images/loisir.webp') },
  { id: '4', category: 'Loisir', title: 'Endroit le plus visité', image: require('@/assets/images/loisir.webp') },
];

export default function FeaturedCarousel() {
  return (
    <Carousel
      loop
      width={width * 0.8}
      height={200}
      autoPlay={false}
      data={featuredItems}
      mode="parallax"
      scrollAnimationDuration={500}
      renderItem={({ item }: { item: typeof featuredItems[0] }) => (
        <TouchableOpacity style={styles.carouselItem}>
          <Image source={item.image} style={styles.carouselImage} contentFit="cover" />
          <View style={styles.carouselFooter}>
            <ThemedText style={styles.carouselCategory}>{item.category}</ThemedText>
            <ThemedText style={styles.carouselTitle}>{item.title}</ThemedText>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  carouselItem: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#222',
  },
  carouselImage: {
    width: '100%',
    height: '70%',
  },
  carouselFooter: {
    padding: 10,
  },
  carouselCategory: {
    color: '#1043b1',
    fontSize: 12,
    marginBottom: 4,
  },
  carouselTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export { FeaturedCarousel };