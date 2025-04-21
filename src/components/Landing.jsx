"use client";
import React, { useRef } from "react";
import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Box,
  Grid,
  Image,
  IconButton,
  Tooltip,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  VStack,
  HStack,
  Badge,
  Divider,
  SimpleGrid,
  InputGroup,
  Input,
  InputRightElement,
  Select,
} from "@chakra-ui/react";

import { 
  FaShoppingCart, 
  FaSearch, 
  FaStar, 
  FaLeaf, 
  FaGlobeAfrica, 
  FaTruck,
  FaHeart,
  FaFilter
} from 'react-icons/fa';
import { useColorMode, useColorModeValue } from '@chakra-ui/react';
import Nav from "./Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SimpleThreeColumns from "./Features";
import BasicStatistics from "./Stats";
import SmallWithSocial from "./Footer";
import ScrollAnimationWrapper from "../styles/ScrollAnimationWrapper";
import WalletBar from "./misc/WalletBar";

import Simple from './Products';
import { motion } from 'framer-motion';

const Illustration = (props) => {
  return (
    <img
      src="/farmer1.jpg"
      alt="Illustration"
      style={{
        width: "100%",
        height: "auto",
        maxHeight: "80vh",
        objectFit: "contain",
        borderRadius: "10px",
      }}
    />
  );
};

// Enhanced product data
const marketplaceProducts = [
  {
    id: 1,
    name: 'Fresh Cabbage',
    price: '$20.00/kg',
    priceInUSDC: 20,
    image: '/cabbage.jpg',
    rating: 4.8,
    reviews: 128,
    origin: 'Kenya',
    category: 'Vegetables',
    organic: true,
    seller: 'Green Valley Farms',
    inStock: true
  },
  {
    id: 2,
    name: 'Nigerian Pepper',
    price: '$45.00/kg',
    priceInUSDC: 45,
    image: '/pepper.jpg',
    rating: 4.6,
    reviews: 92,
    origin: 'Nigeria',
    category: 'Spices',
    organic: true,
    seller: 'Lagos Spice Traders',
    inStock: true
  },
  {
    id: 3,
    name: 'Ghanaian Cocoa Beans',
    price: '$75.00/kg',
    priceInUSDC: 75,
    image: '/cocoa.jpg',
    rating: 4.9,
    reviews: 215,
    origin: 'Ghana',
    category: 'Beans',
    organic: true,
    seller: 'Accra Bean Co-op',
    inStock: true
  },
  {
    id: 4,
    name: 'Ethiopian Coffee',
    price: '$65.00/kg',
    priceInUSDC: 65,
    image: '/cocoa.jpg',
    rating: 5.0,
    reviews: 183,
    origin: 'Ethiopia',
    category: 'Coffee',
    organic: true,
    seller: 'Addis Ababa Growers',
    inStock: true
  },
  {
    id: 5,
    name: 'South African Grapes',
    price: '$30.00/kg',
    priceInUSDC: 30,
    image: '/grapes.jpeg',
    rating: 4.5,
    reviews: 76,
    origin: 'South Africa',
    category: 'Fruits',
    organic: false,
    seller: 'Cape Vineyard Farms',
    inStock: true
  },
  {
    id: 6,
    name: 'Rwandan Tea Leaves',
    price: '$40.00/kg',
    priceInUSDC: 40,
    image: '/tea.jpg',
    rating: 4.7,
    reviews: 104,
    origin: 'Rwanda',
    category: 'Tea',
    organic: true,
    seller: 'Kigali Tea Co.',
    inStock: true
  },
  {
    id: 7,
    name: 'Egyptian Cotton',
    price: '$120.00/kg',
    priceInUSDC: 120,
    image: '/cotton.jpg',
    rating: 4.9,
    reviews: 89,
    origin: 'Egypt',
    category: 'Fiber',
    organic: false,
    seller: 'Nile Delta Textiles',
    inStock: false
  },
  {
    id: 8,
    name: 'Moroccan Olives',
    price: '$35.00/kg',
    priceInUSDC: 35,
    image: '/tomoko.jpeg',
    rating: 4.6,
    reviews: 112,
    origin: 'Morocco',
    category: 'Fruits',
    organic: true,
    seller: 'Atlas Mountain Groves',
    inStock: true
  }
];

// Categories for the marketplace
const productCategories = [
  { name: 'Vegetables', icon: FaLeaf, color: 'green.500' },
  { name: 'Fruits', icon: FaLeaf, color: 'orange.500' },
  { name: 'Spices', icon: FaLeaf, color: 'red.500' },
  { name: 'Coffee & Tea', icon: FaLeaf, color: 'brown.500' },
  { name: 'Beans', icon: FaLeaf, color: 'yellow.700' },
  { name: 'Fiber', icon: FaLeaf, color: 'blue.500' }
];

// Special deals section
const specialDeals = [
  { id: 3, discount: '20% OFF', endDate: 'Ends in 2 days' },
  { id: 5, discount: 'BUY 2 GET 1 FREE', endDate: 'Limited time offer' }
];

const MotionFlex = motion(Flex);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionStack = motion(Stack);
const MotionButton = motion(Button);
const MotionBox = motion(Box);

// Product Card Component
const ProductCard = ({ product, onExpand, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Find if this product has a special deal
  const deal = specialDeals.find(deal => deal.id === product.id);
  
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      bg="white"
      shadow="md"
      transition="all 0.3s ease"
      transform={isHovered ? "scale(1.03)" : "scale(1)"}
      position="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {deal && (
        <Badge 
          position="absolute" 
          top="10px" 
          right="10px" 
          colorScheme="red" 
          fontSize="0.8em" 
          p="5px" 
          borderRadius="md"
          zIndex="1"
        >
          {deal.discount}
        </Badge>
      )}
      
      {product.organic && (
        <Badge 
          position="absolute" 
          top="10px" 
          left="10px" 
          colorScheme="green" 
          fontSize="0.8em"
          p="5px"
          borderRadius="md"
          zIndex="1"
        >
          ORGANIC
        </Badge>
      )}
      
      <Box textAlign="center" position="relative">
        <Image 
          src={product.image} 
          alt={product.name} 
          height="180px"
          width="100%"
          objectFit="cover" 
          mx="auto" 
          mb={4} 
          borderRadius="md"
        />
        
        {isHovered && (
          <Flex 
            position="absolute" 
            top="0" 
            left="0" 
            right="0" 
            bottom="0" 
            justify="center" 
            align="center" 
            bg="rgba(0,0,0,0.2)"
            borderRadius="md"
          >
            <Button 
              colorScheme="green" 
              onClick={() => onExpand(product)}
            >
              View Details
            </Button>
          </Flex>
        )}
        
        <Text fontWeight="bold" fontSize="lg" noOfLines={1}>
          {product.name}
        </Text>
        
        <Text color="gray.500" fontSize="sm" mb={1}>
          Origin: {product.origin}
        </Text>
        
        <Text color="gray.500" fontSize="sm" mb={2}>
          Seller: {product.seller}
        </Text>
        
        <Flex align="center" justify="center" mb={2}>
          <Flex align="center" mr={2}>
            <FaStar color="gold" />
            <Text ml={1} fontWeight="bold">{product.rating}</Text>
          </Flex>
          <Text color="gray.500" fontSize="sm">({product.reviews} reviews)</Text>
        </Flex>
        
        <Flex justify="space-between" align="center">
          <Text fontWeight="bold" fontSize="xl" color="green.600">
            {product.price}
          </Text>
          
          <HStack>
            <IconButton
              icon={<FaHeart />}
              variant="ghost"
              colorScheme="pink"
              size="sm"
              aria-label="Add to Wishlist"
            />
            <IconButton
              icon={<FaShoppingCart />}
              colorScheme="green"
              variant="solid"
              size="sm"
              onClick={() => onAddToCart(product)}
              aria-label="Add to Cart"
              isDisabled={!product.inStock}
            />
          </HStack>
        </Flex>
        
        {!product.inStock && (
          <Badge colorScheme="red" mt={2} width="100%">Out of Stock</Badge>
        )}
      </Box>
    </Box>
  );
};

// Category Card Component
const CategoryCard = ({ category }) => {
  const Icon = category.icon;
  
  return (
    <Flex 
      direction="column" 
      align="center" 
      justify="center" 
      bg="rgba(255,255,255,0.7)" 
      p={4} 
      borderRadius="lg" 
      shadow="sm"
      cursor="pointer"
      transition="transform 0.2s"
      _hover={{ transform: "translateY(-5px)" }}
      border="1px solid"
      borderColor="gray.100"
    >
      <Box 
        bg={category.color} 
        p={3} 
        borderRadius="full" 
        color="white" 
        mb={3}
      >
        <Icon size="24px" />
      </Box>
      <Text fontWeight="semibold" color="green.800">{category.name}</Text>
    </Flex>
  );
};

export default function CallToActionWithIllustration() {
  const navigate = useNavigate();
  const [walletConnected, setWalletConnected] = useState(false);

  const farmerSectionRef = React.useRef(null);

  // Product List Section
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isCartOpen, onOpen: onCartOpen, onClose: onCartClose } = useDisclosure();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter products based on search and category
  const filteredProducts = marketplaceProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.seller.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleExpand = (product) => {
    setSelectedProduct(product);
    onOpen();
  };

  const handleAddToCart = (product) => {
    if (product.inStock) {
      setCart([...cart, product]);
    }
  };

  const handleWalletConnect = (walletInfo) => {
    setWalletConnected(true);
    // Update auth context with wallet info
    dispatch(authActions.login(walletInfo));
    // You can also redirect if needed
    // navigate("/productlist");
  };

  const scrollToFarmerSection = () => {
    // Smooth scroll to the farmer section
    farmerSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBuyerRegistration = () => {
    // Scroll to farmer section instead of checking wallet
    scrollToFarmerSection();
  };

  const handleAgentRegistration = () => {  
    navigate("/registeragent");
  };

  return (
    <ScrollAnimationWrapper>
      <Container
        maxW={"full"}
        px={{ base: 6, md: 8, lg: 12 }}
        py={5}
        bg={useColorModeValue("white", "rgba(0,75,0,0.15)")}
        backgroundImage={useColorModeValue(
          "none", 
          "linear-gradient(to bottom right, rgba(32,64,32,0.9), rgba(35,70,35,0.85), rgba(40,75,40,0.9))"
        )}
        backdropFilter={useColorModeValue("none", "blur(5px)")}
        color={useColorModeValue("gray.800", "white")}
      >
        <Nav />
        <Flex flex="1" justify="flex-end" mb={4}>
        <Button
                  rounded={"full"}
                  px={10}
                  py={6}
                  colorScheme={"orange"}
                  bg={"yellow.400"}
                  textColor={"black"}
                  _hover={{ bg: "green.500" }}
                  size="lg"
                >
                  <WalletBar onConnect={handleWalletConnect} />
                </Button>
        
        {/* WalletBar Integration */}
  
          
        </Flex>
        
        {/* Hero Section */}
        <Stack
          textAlign={"center"}
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 12, md: 16 }}
        >
          <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            justify="space-between"
            w="full"
          >
            {/* Left side - Heading and Intro */}
            <Flex direction="column" align="flex-start" flex="2" mt={2}>
              <Heading
                fontWeight={600}
                fontSize={{ base: "4xl", sm: "5xl", md: "7xl" }}
                lineHeight={"110%"}
                color={useColorModeValue("green.700", "white")}
              >
                VIEW{}
                <Text as={"span"} color={"green.400"}>
                  SHA
                </Text>
              </Heading>
              <Text
                maxW={"4xl"}
                mt={4}
                textAlign="left"
                fontSize={{ base: "lg", sm: "xl", md: "2xl" }}
                color={useColorModeValue("gray.700", "whiteAlpha.900")}
              >
                Our platform connects farmers to global markets, ensuring fair
                compensation for sustainable farming. By cutting out middlemen,
                farmers can directly access international markets, delivering
                top-quality produce while supporting eco-friendly practices.
                Enjoy the best meals, sourced sustainably.
              </Text>
              
              {/* Hero Section Buttons */}
              <Stack spacing={6} direction={{ base: "column", sm: "row" }} mt={10}>
                <Button
                  rounded={"full"}
                  px={10}
                  py={6}
                  colorScheme={"orange"}
                  bg={"green.400"}
                  _hover={{ bg: "green.500" }}
                  onClick={handleBuyerRegistration}
                  size="lg"
                >
                  Become a Farmer
                </Button>

                <Button
                  rounded={"full"}
                  px={10}
                  py={6}
                  bg={"yellow.400"}
                  textColor={"black"}
                  _hover={{ bg: "green.500" }}
                  onClick={handleAgentRegistration}
                  size="lg"
                >
                  Become an Agent
                </Button>
              </Stack>
            </Flex>

            {/* Right side - Image */}
            <Flex
              flex="1"
              justify="center"
              align="center"
              mt={{ base: 10, md: 0 }}
              ml={{ md: 10 }}
            >
              <Illustration />
            </Flex>
          </Flex>
        </Stack>

        {/* Categories Section */}
        <Box mb={12}>
          <Heading 
            textAlign="center" 
            fontSize={{ base: "2xl", md: "3xl" }} 
            mb={8}
            color="white"
          >
            Browse by Category
          </Heading>
          <SimpleGrid columns={{ base: 3, md: 6 }} spacing={5}>
            {productCategories.map((category, index) => (
              <CategoryCard key={index} category={category} />
            ))}
          </SimpleGrid>
        </Box>
        
        {/* Search and Filter */}
        <Flex 
          direction={{ base: "column", md: "row" }} 
          justify="space-between" 
          align={{ base: "stretch", md: "center" }}
          mb={8}
          bg={useColorModeValue("white", "rgba(255,255,255,0.9)")}
          p={4}
          borderRadius="lg"
          shadow="sm"
          border="1px solid"
          borderColor="gray.100"
          color="black"
        >
          <InputGroup size="lg" maxW={{ md: "400px" }} mb={{ base: 4, md: 0 }}>
            <Input 
              placeholder="Search products, origins, or sellers..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              borderColor="green.300"
              color="black"
              _focus={{ borderColor: "green.500" }}
              _placeholder={{ color: "gray.700" }}
            />
            <InputRightElement>
              <IconButton
                icon={<FaSearch />}
                variant="ghost"
                colorScheme="green"
                aria-label="Search"                
              />
            </InputRightElement>
          </InputGroup>
          
          <HStack spacing={4}>
            <Select 
              placeholder="All Categories" 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              size="lg"
              maxW={{ base: "full", md: "200px" }}
              borderColor="green.300"
              color="black"
              _focus={{ borderColor: "green.500" }}
            >
              <option value="All">All Categories</option>
              {productCategories.map((cat, idx) => (
                <option key={idx} value={cat.name}>{cat.name}</option>
              ))}
            </Select>
            
            <Tooltip label="Filter Options">
              <IconButton
                icon={<FaFilter />}
                colorScheme="green"
                variant="outline"
                size="lg"
                aria-label="Filter Options"
              />
            </Tooltip>
            
            <Tooltip label="View Cart">
              <IconButton
                icon={<FaShoppingCart />}
                colorScheme="green"
                variant="solid"
                size="lg"
                onClick={onCartOpen}
                aria-label="View Cart"
                position="relative"
              >
                {cart.length > 0 && (
                  <Badge 
                    position="absolute" 
                    top="-8px" 
                    right="-8px" 
                    colorScheme="red" 
                    borderRadius="full" 
                    fontSize="0.8em"
                  >
                    {cart.length}
                  </Badge>
                )}
              </IconButton>
            </Tooltip>
          </HStack>
        </Flex>

        {/* Featured Products Section */}
        <Box py={10}>
          <Heading
            textAlign="center"
            fontSize={{ base: "2xl", md: "3xl" }}
            mb={2}
            color="white"
          >
            Featured Products
          </Heading>
          <Text 
            textAlign="center" 
            fontSize="lg" 
            color="whiteAlpha.900"
            mb={8}
          >
            Direct from farmers across Africa
          </Text>
          
          {filteredProducts.length > 0 ? (
            <Grid 
              templateColumns={{ 
                base: "1fr", 
                sm: "repeat(2, 1fr)", 
                md: "repeat(3, 1fr)", 
                lg: "repeat(4, 1fr)" 
              }} 
              gap={6}
            >
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onExpand={handleExpand}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </Grid>
          ) : (
            <Box textAlign="center" p={10} bg="rgba(255,255,255,0.8)" borderRadius="lg" border="1px solid" borderColor="gray.100">
              <Heading size="md" mb={4}>No products found</Heading>
              <Text>Try adjusting your search or filters to find what you're looking for.</Text>
            </Box>
          )}
          
          <Flex justify="center" mt={10}>
            <Button 
              colorScheme="green" 
              size="lg" 
              onClick={() => navigate("/productlist")}
              rightIcon={<Box as="span" ml={1}>→</Box>}
            >
              Browse All Products
            </Button>
          </Flex>
        </Box>

        {/* Why Choose Us Section */}
        <Box 
          bg="rgba(255,255,255,0.9)" 
          borderRadius="xl" 
          shadow="sm" 
          p={{ base: 6, md: 10 }}
          my={16}
          border="1px solid"
          borderColor="gray.100"
        >
          <Heading 
            textAlign="center" 
            fontSize={{ base: "2xl", md: "3xl" }} 
            mb={10}
            color="green.700"
          >
            Why Choose P2P Farmers Marketplace?
          </Heading>
          
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            <Flex direction="column" align="center" textAlign="center">
              <Box 
                bg="green.100" 
                p={4} 
                borderRadius="full" 
                mb={4}
              >
                <FaGlobeAfrica size="36px" color="#38A169" />
              </Box>
              <Heading size="md" color="black" mb={3}>Direct from Farmers</Heading>
              <Text color="gray.600">
                Cut out the middlemen and support local farmers directly. Our platform ensures farmers get fair compensation for their hard work.
              </Text>
            </Flex>
            
            <Flex direction="column" align="center" textAlign="center">
              <Box 
                bg="green.100" 
                p={4} 
                borderRadius="full" 
                mb={4}
              >
                <FaLeaf size="36px" color="#38A169" />
              </Box>
              <Heading size="md" color="black" mb={3}>Sustainable & Organic</Heading>
              <Text color="gray.600">
                We prioritize eco-friendly farming practices. Many of our products are certified organic and sustainably grown.
              </Text>
            </Flex>
            
            <Flex direction="column" align="center" textAlign="center">
              <Box 
                bg="green.100" 
                p={4} 
                borderRadius="full" 
                mb={4}
              >
                <FaTruck size="36px" color="#38A169" />
              </Box>
              <Heading size="md" color="black" mb={3}>Global Delivery</Heading>
              <Text color="gray.600">
                We ship to over 50 countries worldwide, using DHL bringing the freshest African produce right to your doorstep.
              </Text>
            </Flex>
          </SimpleGrid>
        </Box>

        <BasicStatistics />
        <SimpleThreeColumns />
        
        <Stack
          textAlign={"center"}
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
            color={useColorModeValue("green.700", "white")}
          >
            Access all food{" "}
            <Text as={"span"} color={"green.400"}>
              across the globe
            </Text>
          </Heading>
          <Flex w={"full"} justify="center">
            <img src="/HugeGlobal.svg" alt="" />
          </Flex>
        </Stack>
        {/* Are you a Farmer Section */}
 {/* Are you a Farmer Section */}
<MotionStack
  ref={farmerSectionRef}
  align={'center'}
  textAlign={'center'}
  spacing={6}
  py={{ base: 16, md: 24 }}
  bg={useColorModeValue("rgba(56, 161, 105, 0.05)", "rgba(0, 255, 0, 0.05)")}
  borderRadius="lg"
  p={8}
  mt={10}
  initial={{ opacity: 0.8 }}
  animate={{
    boxShadow: useColorModeValue(
      [
        "0 0 15px rgba(56, 161, 105, 0.2)",
        "0 0 30px rgba(56, 161, 105, 0.4)",
        "0 0 15px rgba(56, 161, 105, 0.2)",
      ],
      [
        "0 0 15px rgba(0, 255, 0, 0.2)",
        "0 0 30px rgba(0, 255, 0, 0.4)",
        "0 0 15px rgba(0, 255, 0, 0.2)",
      ]
    ),
    opacity: [0.8, 1, 0.8]
  }}
  transition={{
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }}
  position="relative"
  _after={{
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 'lg',
    background: 'transparent',
    border: useColorModeValue(
      '1px solid rgba(56, 161, 105, 0.3)',
      '1px solid rgba(0, 255, 0, 0.2)'
    ),
    filter: 'blur(4px)',
    zIndex: -1,
    opacity: 0.7,
  }}
>
  <MotionHeading 
    fontWeight={700} 
    fontSize={{ base: '2xl', md: '4xl' }}
    color={useColorModeValue("green.700", "white")}
    animate={{ 
      textShadow: useColorModeValue(
        [
          "0 0 5px rgba(56, 161, 105, 0)",
          "0 0 10px rgba(56, 161, 105, 0.3)",
          "0 0 5px rgba(56, 161, 105, 0)",
        ],
        [
          "0 0 5px rgba(0, 255, 0, 0)",
          "0 0 10px rgba(0, 255, 0, 0.3)",
          "0 0 5px rgba(0, 255, 0, 0)",
        ]
      )
    }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    Are you a Farmer?
  </MotionHeading>
  
  <MotionText 
    fontSize={'lg'} 
    maxW={'2xl'}
    color={useColorModeValue("gray.700", "white")}
    initial={{ opacity: 0.9 }}
    animate={{ opacity: [0.9, 1, 0.9] }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 0.5
    }}
  >
    Join our platform to connect directly with international markets or find local
    agents who can assist you.
  </MotionText>
  
  <Button
    as={MotionBox}
    rounded={'full'}
    px={6}
    bg={'green.400'}
    color={'white'}
    _hover={{ bg: 'green.500' }}
    onClick={() => window.open('https://maps.google.com', '_blank')}
    whileHover={{ 
      scale: 1.05,
      boxShadow: useColorModeValue(
        "0 0 20px rgba(56, 161, 105, 0.6)",
        "0 0 20px rgba(0, 255, 0, 0.6)"
      )
    }}
    initial={{ 
      boxShadow: useColorModeValue(
        "0 0 10px rgba(56, 161, 105, 0)",
        "0 0 10px rgba(0, 255, 0, 0)"
      )
    }}
    animate={{ 
      boxShadow: useColorModeValue(
        [
          "0 0 10px rgba(56, 161, 105, 0.2)",
          "0 0 20px rgba(56, 161, 105, 0.4)",
          "0 0 10px rgba(56, 161, 105, 0.2)"
        ],
        [
          "0 0 10px rgba(0, 255, 0, 0.2)",
          "0 0 20px rgba(0, 255, 0, 0.4)",
          "0 0 10px rgba(0, 255, 0, 0.2)"
        ]
      )
    }}
    transition={{
      boxShadow: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }}
  >
    Find an Agent Near You
  </Button>
</MotionStack>
        
        <SmallWithSocial />
      </Container>

      {/* Modal for full-page product display */}
      {selectedProduct && (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody p={6}>
              <Flex direction={{ base: "column", md: "row" }} align="stretch">
                <Box flex="1" mr={{ md: 6 }} mb={{ base: 6, md: 0 }}>
                  <Image 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name} 
                    borderRadius="lg"
                    width="100%"
                    height="300px"
                    objectFit="cover"
                  />
                </Box>
                
                <Flex direction="column" flex="1">
                  <Heading size="lg" mb={2}>{selectedProduct.name}</Heading>
                  
                  <Flex align="center" mb={4}>
                    <Flex align="center" mr={4}>
                      <FaStar color="gold" />
                      <Text ml={1} fontWeight="bold">{selectedProduct.rating}</Text>
                    </Flex>
                    <Text color="gray.500">({selectedProduct.reviews} reviews)</Text>
                  </Flex>
                  
                  <Text fontSize="2xl" fontWeight="bold" color="green.600" mb={4}>
                    {selectedProduct.price}
                  </Text>
                  
                  <SimpleGrid columns={2} spacing={4} mb={4}>
                    <Box>
                      <Text fontWeight="bold" color="gray.500">Origin</Text>
                      <Text>{selectedProduct.origin}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold" color="gray.500">Category</Text>
                      <Text>{selectedProduct.category}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold" color="gray.500">Seller</Text>
                      <Text>{selectedProduct.seller}</Text>
                    </Box>
                    <Box>
                      <Text fontWeight="bold" color="gray.500">Organic</Text>
                      <Text>{selectedProduct.organic ? "Yes" : "No"}</Text>
                    </Box>
                  </SimpleGrid>
                  
                  <Divider my={4} />
                  
                  <Text mb={4}>
                    Premium quality {selectedProduct.name.toLowerCase()} sourced directly from farmers 
                    in {selectedProduct.origin}. {selectedProduct.organic ? "Organically grown without pesticides or chemicals." : ""}
                  </Text>
                  
                  <Flex mt="auto">
                    <Button 
                      colorScheme="green" 
                      flex="1" 
                      mr={3}
                      leftIcon={<FaShoppingCart />}
                      onClick={() => {
                        handleAddToCart(selectedProduct);
                        onClose();
                      }}
                      isDisabled={!selectedProduct.inStock}
                    >
                      Add to Cart
                    </Button>
                    <Button 
                      variant="outline" 
                      colorScheme="pink"
                      leftIcon={<FaHeart />}
                    >
                      Wishlist
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}

      {/* Cart Modal */}
      <Modal isOpen={isCartOpen} onClose={onCartClose} size="lg">
        <ModalOverlay backdropFilter="blur(5px)" />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody py={6}>
            <VStack spacing={4} align="stretch">
              <Heading size="lg" mb={2}>Your Shopping Cart</Heading>
              
              {cart.length === 0 ? (
                <Flex 
                  direction="column" 
                  align="center" 
                  justify="center" 
                  p={10} 
                  bg="gray.50" 
                  borderRadius="lg"
                >
                  <Box 
                    fontSize="5xl" 
                    color="gray.300" 
                    mb={4}
                  >
                    <FaShoppingCart />
                  </Box>
                  <Heading size="md" mb={2} color="gray.500">Your cart is empty</Heading>
                  <Text color="gray.500" mb={6} textAlign="center">
                    Add some products from our marketplace to get started.
                  </Text>
                  <Button 
                    colorScheme="green" 
                    onClick={onCartClose}
                  >
                    Browse Products
                  </Button>
                </Flex>
              ) : (
                <>
                  <Box overflowY="auto" maxH="400px">
                    {cart.map((item, index) => (
                      <Flex 
                        key={index} 
                        justify="space-between" 
                        align="center" 
                        p={3} 
                        borderWidth="1px" 
                        borderRadius="md"
                        mb={2}
                      >
                        <Flex align="center">
                          <Image 
                            src={item.image} 
                            alt={item.name} 
                            boxSize="60px"
                            objectFit="cover" 
                            borderRadius="md"
                            mr={4}
                          />
                          <Box>
                            <Text fontWeight="bold">{item.name}</Text>
                            <Text fontSize="sm" color="gray.500">Origin: {item.origin}</Text>
                          </Box>
                        </Flex>
                        <Box textAlign="right">
                          <Text fontWeight="bold" color="green.600">{item.price}</Text>
                          <Button 
                            size="xs" 
                            colorScheme="red" 
                            variant="ghost"
                            onClick={() => {
                              const newCart = [...cart];
                              newCart.splice(index, 1);
                              setCart(newCart);
                            }}
                          >
                            Remove
                          </Button>
                        </Box>
                      </Flex>
                    ))}
                  </Box>
                  
                  <Divider my={4} />
                  
                  <Flex justify="space-between" fontWeight="bold">
                    <Text>Total ({cart.length} items):</Text>
                    <Text color="green.600">
                      ${cart.reduce((total, item) => total + item.priceInUSDC, 0).toFixed(2)}
                    </Text>
                  </Flex>
                  
                  <Button 
                    colorScheme="green" 
                    size="lg" 
                    w="full" 
                    mt={4}
                    onClick={() => {
                      alert("Checkout functionality will be implemented soon!");
                      // You can add the actual payment flow here
                    }}
                  >
                    Proceed to Checkout
                  </Button>
                </>
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </ScrollAnimationWrapper>
  );
}