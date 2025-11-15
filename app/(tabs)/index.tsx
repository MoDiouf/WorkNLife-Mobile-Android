import { View, TouchableOpacity, StyleSheet, ImageSourcePropType } from 'react-native';
import { Image } from 'expo-image';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FeaturedCarousel } from '@/components/ui/FeaturedCarousel';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#ffffffff', dark: '#000' }}
      headerImage={<View  />}
      headerHeight={0}
    >
      {/* HEADER */}
      <ThemedView style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <ThemedText type="title" style={{ fontSize: 32 }}>Bonjour !</ThemedText>
          <HelloWave />
        </View>
        <ThemedText style={styles.subtitle}>
          Que souhaitez-vous faire aujourd’hui ?
        </ThemedText>

        {/* Location Badge */}
        <View style={styles.locationBadge}>
          <Ionicons name="location" size={16} color="#fff" />
          <ThemedText style={{ color: '#fff' }}>Paris, France</ThemedText>
        </View>
      </ThemedView>

      {/* SERVICES */}
      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Nos Services
        </ThemedText>

        <View style={styles.grid}>
          
          {/* COVOITURAGE */}
          <ServiceCard
            image={require('./../../assets/images/convoiturage.jpeg')}
            title="Covoiturage"
            subtitle="Partagez vos trajets"
            icon="car"
            color="#3ABEFF"
            description='Économique et écologique'
          />

          {/* COMMANDES */}
          <ServiceCard
            image={require('@/assets/images/commande.jpeg')}
            title="Commandes"
            subtitle="Livraison de repas"
            icon="fast-food"
            color="#FFB800"
            description='Délicieux à votre porte'
          />

          {/* HEALTHY */}
          <ServiceCard
            image={require('@/assets/images/commade.jpeg')}
            title="Healthy"
            subtitle="Bien-être & santé"
            icon="heart"
            color="#00E18C"
            description='Prenez soin de vous'
          />

          {/* LOISIRS */}
          <ServiceCard
            image={require('@/assets/images/loisir.webp')}
            title="Loisirs"
            subtitle="Divertissement"
            icon="game-controller"
            color="#B07CFF"
            description='Détendez-vous et amusez-vous'
          />

        </View>
      </ThemedView>

      
      <ThemedView style={styles.section}>
        <View style={styles.rowBetween}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>À la une</ThemedText>
          <Link href="/"><ThemedText style={styles.link}>Voir tout →</ThemedText></Link>
        </View>

        <FeaturedCarousel />
      </ThemedView>

    </ParallaxScrollView>
  );
}


interface ServiceCardProps {
  image: ImageSourcePropType;
  title: string;
  subtitle: string;
  icon:  keyof typeof Ionicons.glyphMap;
  color: string;
  description: string;
}

function ServiceCard({ image , title, subtitle, icon, color , description }: ServiceCardProps) {
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={image} style={styles.cardImage} contentFit="cover" />
      <View style={[styles.iconBadge, { backgroundColor: color }]}>
        <Ionicons name={icon} size={18} color="#fff" />
      </View>
      <View style={styles.cardFooter}>
        <ThemedText style={styles.cardTitle}>{title}</ThemedText>
        <ThemedText style={styles.cardSubtitle}>{subtitle}</ThemedText>
        <ThemedText style={{ color: '#666868ff', fontSize: 10 }}>{description}</ThemedText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 8,
    marginBottom: 20,
  },
  subtitle: {
    color: '#AAA',
    fontSize: 14,
  },
  locationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#333',
    paddingVertical: 6,
    paddingHorizontal: 12,
    width: 130,
    borderRadius: 20,
    marginTop: 6,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    width: '47%',
    height: 210,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#222',
  },
  cardImage: {
    width: '100%',
    height: '65%',
  },
  iconBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 6,
    borderRadius: 20,
  },
  cardFooter: {
    height: '30%',
    paddingHorizontal: 10,
    paddingVertical: 3,
    gap:0,
  },
  cardTitle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  cardSubtitle: {
    color: '#AAA',
    fontSize: 12,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  link: {
    color: '#4ADE80',
  },
  topImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 16,
  },
});
