import {
  createStyles,
  Header,
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  Space,
} from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { IconChevronDown } from "@tabler/icons-react";
import { useSelector, useDispatch } from "react-redux";
import { LOG_OUT_REQUEST } from "../reducers/user";

const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

const mockdata = [
  {
    title: "Salad",
    links: "/menu/",
    items: "샐러드",
  },
  {
    title: "Sandwich",
    links: "/menu/",
    items: "샌드위치",
  },
  {
    title: "Wrap",
    links: "/menu/",
    items: "랩",
  },
  {
    title: "Greek yogyrt",
    links: "/menu/",
    items: "요거트",
  },
  {
    title: "Side",
    links: "/menu/",
    items: "사이드",
  },
  {
    title: "Lunch box",
    links: "/menu/",
    items: "도시락",
  },
];

function HeaderComponent() {
  const dispatch = useDispatch();
  const { logInDone } = useSelector((state) => state.user);
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();

  const handlelogOut = () => {
    dispatch({ type: LOG_OUT_REQUEST });
  };

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Link href={item.links + item.items}>
        <Group noWrap align="flex-start">
          <div>
            <Text size="sm" fw={500}>
              {item.title}
            </Text>
          </div>
        </Group>
      </Link>
    </UnstyledButton>
  ));

  return (
    <Box>
      <Header
        style={{ backgroundColor: "rgba(236, 228, 215, 1)" }}
        height={60}
        px="md"
      >
        <Group position="center" sx={{ height: "100%" }}>
          <Group
            sx={{ height: "100%" }}
            spacing={100}
            className={classes.hiddenMobile}
          >
            <a href="/about" className={classes.link}>
              <Text fz="xl">About</Text>
            </a>
            <HoverCard
              width={600}
              position="bottom"
              radius="md"
              shadow="md"
              withinPortal
            >
              <HoverCard.Target>
                <Center inline>
                  <Box component="span" mr={5}>
                    {/* hover카드 */}
                    <Text
                      style={{ userSelect: "none", fontWeight: "500" }}
                      fz="xl"
                    >
                      Menu
                    </Text>
                  </Box>
                  <IconChevronDown size={16} color={theme.fn.primaryColor()} />
                </Center>
              </HoverCard.Target>

              <HoverCard.Dropdown
                sx={{ overflow: "hidden" }}
                style={{ backgroundColor: "rgba(236, 228, 215, 1)" }}
              >
                <Group position="apart" px="md">
                  {/* dropdown */}
                  <Text style={{ userSelect: "none" }}>Menu</Text>
                  <Anchor href="#" fz="xs">
                    View all
                  </Anchor>
                </Group>

                <Divider
                  my="sm"
                  mx="-md"
                  color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
                />

                <SimpleGrid cols={2} spacing={0}>
                  {links}
                </SimpleGrid>
              </HoverCard.Dropdown>
            </HoverCard>
            <a href="#" className={classes.link}>
              <Text fz="xl">Nutrition</Text>
            </a>
            <a href="#" className={classes.link}>
              <Text fz="xl">Store</Text>
            </a>
          </Group>
          <Space w="xl" />
          <Group className={classes.hiddenMobile} mr="xl">
            {!logInDone ? (
              <div>
                <a href="/loginpage/login">
                  <Button mr="xl" variant="default">
                    Log in
                  </Button>
                </a>
                <a href="/loginpage/signup">
                  <Button variant="default"> Sign up</Button>
                </a>
              </div>
            ) : (
              <div>
                <a href="/logout">
                  <Button variant="default">Log out</Button>
                </a>
              </div>
            )}
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="GreenyDay"
        className={classes.hiddenDesktop}
        zIndex={1000000}
      >
        <ScrollArea
          h={`calc(100vh - ${rem(60)})`}
          mx="-md"
          style={{ backgroundColor: "rgba(236, 228, 215, 1)" }}
        >
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />
          <a href="/about" className={classes.link}>
            <Text fz="xl"> About</Text>
          </a>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                {/* dropdown */}
                <Text style={{ userSelect: "none", fontSize: "20px" }}>
                  Menu
                </Text>
              </Box>

              <IconChevronDown size={16} color={theme.fn.primaryColor()} />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>

          <a href="#" className={classes.link}>
            <Text fz="xl"> Nutrition</Text>
          </a>

          <a href="#" className={classes.link}>
            <Text fz="xl"> Store</Text>
          </a>

          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          />

          <Group position="center" grow pb="xl" px="md">
            {!logInDone ? (
              <div>
                <a href="/loginpage/login">
                  <Button mr="xl" variant="default">
                    Log in
                  </Button>
                </a>
                <a href="/loginpage/signup">
                  <Button variant="default"> Sign up</Button>
                </a>
              </div>
            ) : (
              <div>
                <a href="/logout">
                  <Button variant="default">Log out</Button>
                </a>
              </div>
            )}
          </Group>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
export default HeaderComponent;
