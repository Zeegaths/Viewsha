"use client";

import { useEffect, useState } from "react";
import SimpleSidebar from "../Sidebar";
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  FormHelperText,
  InputRightElement,
  InputGroup,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  useColorModeValue,
  VStack,
  HStack,
  Container,
} from "@chakra-ui/react";
import useGeolocation from "../hooks/useGeolocation";
import { useNavigate } from "react-router-dom";



// Form components remain unchanged...
const Form1 = ({ agentDetails, handleChange }) => {
  const textColor = useColorModeValue("white", "white");
  const borderColor = useColorModeValue("gray.500", "whiteAlpha.600");

  return (
    <>
      <Heading
        w="100%"
        textAlign="center"
        fontWeight="normal"
        mb="2%"
        color={textColor}
      >
        Agent Registration
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} mb={4}>
        <FormControl>
          <FormLabel color={textColor}>First name</FormLabel>
          <Input
            name="firstName"
            value={agentDetails.firstName}
            onChange={handleChange}
            placeholder="First name"
            borderColor={borderColor}
            _focus={{ borderColor: "green.400" }}
            color={textColor}
          />
        </FormControl>

        <FormControl>
          <FormLabel color={textColor}>Last name</FormLabel>
          <Input
            name="lastName"
            value={agentDetails.lastName}
            onChange={handleChange}
            placeholder="Last name"
            borderColor={borderColor}
            _focus={{ borderColor: "green.400" }}
            color={textColor}
          />
        </FormControl>

        <FormControl>
          <FormLabel color={textColor}>Phone</FormLabel>
          <Input
            name="phone"
            value={agentDetails.phone}
            onChange={handleChange}
            placeholder="Phone number"
            borderColor={borderColor}
            _focus={{ borderColor: "green.400" }}
            color={textColor}
          />
        </FormControl>

        <FormControl>
          <FormLabel color={textColor}>Email address</FormLabel>
          <Input
            name="email"
            type="email"
            value={agentDetails.email}
            onChange={handleChange}
            placeholder="Email address"
            borderColor={borderColor}
            _focus={{ borderColor: "green.400" }}
            color={textColor}
          />
          <FormHelperText color={textColor}>
            We'll never share your email.
          </FormHelperText>
        </FormControl>
      </SimpleGrid>
    </>
  );
};

const Form2 = ({ agentDetails, handleChange }) => {
  const textColor = useColorModeValue("white", "white");
  const borderColor = useColorModeValue("gray.500", "whiteAlpha.600");
  const {
    loading: geoLoading,
    error: geoError,
    data: geolocation,
    getLocation,
  } = useGeolocation();

  const toast = useToast();

  useEffect(() => {
    if (geoError) {
      toast({
        title: "Geolocation Error",
        description:
          "Failed to get your location. Ensure location is on and try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [geoError]);

  useEffect(() => {
    if (geolocation) {
      handleChange({
        target: {
          name: "geolocation",
          value: geolocation,
        },
      });
    }
  }, [geolocation]);

  return (
    <>
      <Heading
        w="100%"
        textAlign="center"
        fontWeight="normal"
        mb="2%"
        color={textColor}
      >
        Business and Location Details
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
        <FormControl>
          <FormLabel color={textColor}>Business Registration Number</FormLabel>
          <Input
            name="businessRegNo"
            value={agentDetails.businessRegNo}
            onChange={handleChange}
            placeholder="Business Registration Number"
            borderColor={borderColor}
            _focus={{ borderColor: "green.400" }}
            color={textColor}
          />
        </FormControl>

        <FormControl>
          <FormLabel color={textColor}>Device ID</FormLabel>
          <Input
            name="deviceId"
            value={agentDetails.deviceId}
            onChange={handleChange}
            placeholder="Device ID"
            borderColor={borderColor}
            _focus={{ borderColor: "green.400" }}
            color={textColor}
          />
        </FormControl>

        <FormControl>
          <FormLabel color={textColor}>Address</FormLabel>
          <Input
            name="address"
            value={agentDetails.address}
            onChange={handleChange}
            placeholder="Address"
            borderColor={borderColor}
            _focus={{ borderColor: "green.400" }}
            color={textColor}
          />
        </FormControl>

        <FormControl>
          <FormLabel color={textColor}>Postal Code</FormLabel>
          <Input
            name="postalCode"
            value={agentDetails.postalCode}
            onChange={handleChange}
            placeholder="Postal Code"
            borderColor={borderColor}
            _focus={{ borderColor: "green.400" }}
            color={textColor}
          />
        </FormControl>

        <FormControl>
          <FormLabel color={textColor}>Country Code</FormLabel>
          <Input
            name="countryCode"
            value={agentDetails.countryCode}
            onChange={handleChange}
            placeholder="Country Code"
            borderColor={borderColor}
            _focus={{ borderColor: "green.400" }}
            color={textColor}
          />
        </FormControl>

        <FormControl>
          <FormLabel color={textColor}>City Name</FormLabel>
          <Input
            name="cityName"
            value={agentDetails.cityName}
            onChange={handleChange}
            placeholder="City Name"
            borderColor={borderColor}
            _focus={{ borderColor: "green.400" }}
            color={textColor}
          />
        </FormControl>

        <FormControl>
          <FormLabel color={textColor}>Province / State Code</FormLabel>
          <Input
            name="provinceCode"
            value={agentDetails.provinceCode}
            onChange={handleChange}
            placeholder="Province / State Code"
            borderColor={borderColor}
            _focus={{ borderColor: "green.400" }}
            color={textColor}
          />
        </FormControl>

        <FormControl>
          <FormLabel color={textColor}>Street Address</FormLabel>
          <Input
            name="streetAddress"
            value={agentDetails.streetAddress}
            onChange={handleChange}
            placeholder="Street Address"
            borderColor={borderColor}
            _focus={{ borderColor: "green.400" }}
            color={textColor}
          />
        </FormControl>

        <FormControl gridColumn={{ md: "span 2" }}>
          <HStack justify={"space-between"} align={"center"} mb={2}>
            <FormLabel color={textColor}>Geolocation</FormLabel>
            <Button
              onClick={getLocation}
              colorScheme="green"
              variant="outline"
              isLoading={geoLoading}
              size={"sm"}
            >
              Get Location
            </Button>
          </HStack>
          <Input
            name="geolocation"
            _focus={{ borderColor: "green.400" }}
            value={
              geolocation
                ? `${geolocation.latitude}, ${geolocation.longitude}`
                : ""
            }
            isReadOnly
            borderColor={borderColor}
            color={textColor}
          />
        </FormControl>
      </SimpleGrid>
    </>
  );
};

const Form3 = ({ agentDetails, handleChange }) => {
  const textColor = useColorModeValue("white", "white");
  const borderColor = useColorModeValue("gray.500", "whiteAlpha.600");

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (file) {
      const reader = new FileReader();

      // Define the onload event handler
      reader.onload = (e) => {
        const arrayBuffer = e.target.result;
        const uint8Array = new Uint8Array(arrayBuffer);
        handleChange({ target: { name, value: uint8Array } });
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <>
      <Heading
        w="100%"
        textAlign="center"
        fontWeight="normal"
        color={textColor}
        mb="4%"
      >
        Passport Photo and Business Permit
      </Heading>
      <SimpleGrid columns={1} spacing={6}>
        <FormControl>
          <FormLabel color={textColor}>Passport Photo</FormLabel>
          <Input
            type="file"
            name="passportPhoto"
            onChange={handleFileChange}
            accept="image/*"
            borderColor={borderColor}
            _focus={{ borderColor: "green.400" }}
            color={textColor}
            p={1}
          />
        </FormControl>
        <FormControl>
          <FormLabel color={textColor}>Business Permit</FormLabel>
          <Input
            type="file"
            name="businessPermit"
            onChange={handleFileChange}
            accept="image/*"
            borderColor={borderColor}
            _focus={{ borderColor: "green.400" }}
            color={textColor}
            p={1}
          />
        </FormControl>
      </SimpleGrid>
    </>
  );
};

export default function AgentForm() {
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  const [agentDetails, setAgentDetails] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    businessRegNo: "",
    deviceId: "",
    address: "",
    postalCode: "",
    countryCode: "",
    cityName: "",
    provinceCode: "",
    streetAddress: "",
    geolocation: null,
    passportPhoto: null,
    businessPermit: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgentDetails({ ...agentDetails, [name]: value });
  };

  const submitDetails = async () => {
    if (!validateForm3()) {
      return;
    }
    setIsSubmitting(true);
    
    const identity = await getIdentity();
    const backend = await createBackendActor(identity);
    const response = await backend.registerAgent({
      firstName: agentDetails.firstName,
      lastName: agentDetails.lastName,
      phone: agentDetails.phone,
      email: agentDetails.email,
      businessRegNo: agentDetails.businessRegNo,
      postalCode: agentDetails.postalCode,
      country: agentDetails.countryCode,
      cityName: agentDetails.cityName,
      stateCode: agentDetails.provinceCode,
      address: agentDetails.address,
      passportPhoto: agentDetails.passportPhoto,
      businessPermit: agentDetails.businessPermit,
      latitude: agentDetails.geolocation.latitude,
      longitude: agentDetails.geolocation.longitude,
    });
    if (response.ok !== undefined) {
      dispatch(authActions.login(response.ok));
      toast({
        title: "Registration Successful",
        description: "Your registration was successful.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/productlist"); 
    } else {
      toast({
        title: "Registration Failed",
        description: "An error occurred while registering.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    setIsSubmitting(false);
  };

  const validateForm1 = () => {
    if (
      agentDetails.firstName === "" ||
      agentDetails.lastName === "" ||
      agentDetails.phone === "" ||
      agentDetails.email === ""
    ) {
      toast({
        title: "Invalid Input",
        description: "Please fill in all fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }

    if (!validateEmail(agentDetails.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }

    return true;
  };

  const validateForm2 = () => {
    if (
      agentDetails.businessRegNo === "" ||
      agentDetails.deviceId === "" ||
      agentDetails.address === "" ||
      agentDetails.postalCode === "" ||
      agentDetails.countryCode === "" ||
      agentDetails.cityName === "" ||
      agentDetails.provinceCode === "" ||
      agentDetails.streetAddress === "" ||
      agentDetails.geolocation === null
    ) {
      toast({
        title: "Invalid Input",
        description: "Please fill in all fields.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }

    // Validate postal code
    const re = /^\d{5,6}$/;
    if (!re.test(agentDetails.postalCode)) {
      toast({
        title: "Invalid Postal Code",
        description: "Please enter a valid postal code.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }

    return true;
  };

  const validateForm3 = () => {
    if (
      agentDetails.passportPhoto === null ||
      agentDetails.businessPermit === null
    ) {
      toast({
        title: "Please upload all files",
        description: "Please upload both passport photo and business permit.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }

    return true;
  };

  // Updated color values for a darker, consistent theme
  const bg = "rgba(0,80,0,0.25)"; // Darker green with transparency
  const formBg = "rgba(20,30,20,0.85)"; // Dark form background with high opacity
  const textColor = "white";

  return (
    <>
      <Flex 
        direction="row" 
        minH="100vh" 
        bg={bg} 
        backdropFilter="blur(10px)"
        // align="center"
        justify="center"
      >
        {/* Sidebar */}
        <Box display={{ base: "none", md: "block" }} w="250px">
          <SimpleSidebar />
        </Box>

        {/* Main Content - Centered */}
        <Container maxW="800px" px={{ base: 4, md: 8 }} py={8} centerContent>
          <Box
            as="form"
            w="full"
            bg={formBg}
            color={textColor}
            borderRadius="xl"
            boxShadow="xl"
            p={{ base: 4, md: 8 }}
            backdropFilter="blur(10px)"
          >
            <Progress
              hasStripe
              value={progress}
              mb="5%"
              isAnimated
              colorScheme="green"
              borderRadius="md"
            />
            
            {step === 1 ? (
              <Form1 agentDetails={agentDetails} handleChange={handleChange} />
            ) : step === 2 ? (
              <Form2 agentDetails={agentDetails} handleChange={handleChange} />
            ) : (
              <Form3 agentDetails={agentDetails} handleChange={handleChange} />
            )}
            
            <ButtonGroup mt="8%" w="100%">
              <Flex w="100%" justifyContent="space-between">
                <Flex>
                  <Button
                    onClick={() => {
                      setStep(step - 1);
                      setProgress(progress - 33.33);
                    }}
                    isDisabled={step === 1}
                    colorScheme="green"
                    variant="solid"
                    w="7rem"
                    mr="5%"
                  >
                    Back
                  </Button>
                  <Button
                    w="7rem"
                    isDisabled={step === 3}
                    onClick={() => {
                      if (step === 1 && !validateForm1()) {
                        return;
                      }
                      if (step === 2 && !validateForm2()) {
                        return;
                      }
                      setStep(step + 1);
                      if (step === 3) {
                        setProgress(100);
                      } else {
                        setProgress(progress + 33.33);
                      }
                    }}
                    colorScheme="green"
                    variant="outline"
                  >
                    Next
                  </Button>
                </Flex>
                {step === 3 ? (
                  <Button
                    w="7rem"
                    colorScheme="green"
                    variant="solid"
                    isLoading={isSubmitting}
                    onClick={submitDetails}
                  >
                    Submit
                  </Button>
                ) : null}
              </Flex>
            </ButtonGroup>
          </Box>
        </Container>
      </Flex>

      {/* Success Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent bg="rgba(20,30,20,0.9)" color="white">
          <ModalHeader>Registration Successful</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Your registration was successful. Waiting for approval.
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}