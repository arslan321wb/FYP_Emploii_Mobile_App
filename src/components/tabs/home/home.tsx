import React from "react";
import { INavigationProps } from "../../../interfaces/navigation";
import {
  Text,
  ActivityIndicator,
  Image,
  View,
  SafeAreaView,
  FlatList,
  StatusBar
} from "react-native";
import { SearchBar } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IJobs, IUser } from "../../../interfaces/common";
import jobApi from "../../../services/api.service";
import StorageService from "../../../services/storage";

export default class Home extends React.Component<INavigationProps> {
  state: {
    isLoading?: boolean;
    jobs: IJobs[];
    copyJobs: IJobs[];
    searchText?: string;
  } = {
    isLoading: true,
    searchText: "",
    jobs: [],
    copyJobs: []
  };
  constructor(prop: any) {
    super(prop);
  }

  componentDidMount() {
    this.getAllJobs();
    this.getUserInfo();
  }

  render() {
    return (
      <SafeAreaView style={{ minHeight: "100%", backgroundColor: "#fff" }}>
        <View style={{ padding: 16 }}>
          {this.state.copyJobs.length && !this.state.isLoading ? (
            <SearchBar
              lightTheme={true}
              containerStyle={{ backgroundColor: "#fff" }}
              inputContainerStyle={{ backgroundColor: "#fff" }}
              inputStyle={{ backgroundColor: "#fff" }}
              onChangeText={text => this.SearchFilterFunction(text)}
              onClear={() => this.setState({ jobs: this.state.copyJobs })}
              placeholder="Enter Job Title here"
              value={this.state.searchText}
            />
          ) : null}
          {this.state.isLoading ? (
            <ActivityIndicator style={{ marginTop: 15 }} color="blue" ></ActivityIndicator>
          ) :
          <FlatList
            style={{ height: "90%" }}
            showsVerticalScrollIndicator={false}
            data={this.state.jobs}
            ListEmptyComponent={({ item }) => (
              <Text style={{ marginTop: 15, textAlign: "center" }}>
                No job found
              </Text>
            )}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("job-detail", {
                    job: item
                  });
                }}
                style={{
                  borderBottomColor: "#ccc",
                  borderBottomWidth: 0.3,
                  paddingBottom: 15,
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 15
                }}
              >
                <View style={{ marginRight: 10 }}>
                  <Image
                    style={{ height: 60, width: 60, borderRadius: 6 }}
                    source={{
                      uri: `http://techdino.tk/public/uploads/employer/${item.company_logo}`
                    }}
                  />
                </View>
                <View style={{ maxWidth: "80%" }}>
                  <View
                    style={{
                      justifyContent: "space-between",
                      flexDirection: "row"
                    }}
                  >
                    <Text
                      style={{ fontSize: 13, fontWeight: "500" }}
                      numberOfLines={1}
                    >
                      {item.job_title}
                    </Text>
                    {item.applied == "no" ? null : (
                      <Text style={{ color: "#78226D" }}>Applied</Text>
                    )}
                  </View>
                  <Text
                    style={{ fontSize: 11, color: "#8c8c8c", marginTop: 7 }}
                    numberOfLines={2}
                  >
                    {item.job_description}
                  </Text>
                  <Text style={{ fontSize: 9, color: "#8c8c8c", marginTop: 2 }}>
                    Apply before: {item.last_date}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.ID}
          />
                    }
        </View>
      </SafeAreaView>
    );
  }

  SearchFilterFunction(text: string) {
    if (text.length == 0) {
      this.setState({ jobs: this.state.copyJobs, searchText: "" });
      return;
    }

    const newData = this.state.jobs.filter((user: IJobs) => {
      const itemData = user.job_title.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      jobs: newData,
      searchText: text
    });
  }

  getAllJobs() {
    // let jobs = [
    //   {
    //     ID: "15",
    //     job_title: "Hr Specilest",
    //     job_slug: "xcv-company-jobs-in-las vegas-hr-specilest-15",
    //     employer_ID: "14",
    //     company_ID: "14",
    //     job_description:
    //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi a velit sed risus pulvinar faucibus. Nulla facilisi. Nullam vehicula nec ligula eu vulputate. Nunc id ultrices mi, ac tristique lectus. Suspendisse porta ultrices ultricies. Sed quis nisi vel magna maximus aliquam a vel nisl. Cras non rutrum diam. Nulla sed ipsum a felis posuere pharetra ut sit amet augue. Sed id nisl sodales, vulputate mi eu, viverra neque. Fusce fermentum, est ut accumsan accumsan, risus ante varius diam, non venenatis eros ligula fermentum leo. Etiam consectetur imperdiet volutpat. Donec ut pharetra nisi, eget pellentesque tortor. Integer eleifend dolor eu ex lobortis, ac gravida augue tristique. Proin placerat consectetur tincidunt. Nullam sollicitudin, neque eget iaculis ultricies, est justo pulvinar turpis, vulputate convallis leo orci at sapien.<br />\n<br />\nQuisque ac scelerisque libero, nec blandit neque. Nullam felis nisl, elementum eu sapien ut, convallis interdum felis. In turpis odio, fermentum non pulvinar gravida, posuere quis magna. Ut mollis eget neque at euismod. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer faucibus orci a pulvinar malesuada. Aenean at felis vitae lorem venenatis consequat. Nam non nunc euismod, consequat ligula non, tristique odio. Ut leo sapien, aliquet sed ultricies et, scelerisque quis nulla. Aenean non sapien maximus, convallis eros vitae, iaculis massa. In fringilla hendrerit nisi, eu pellentesque massa faucibus molestie. Etiam laoreet eros quis faucibus rutrum. Quisque eleifend purus justo, eget tempus quam interdum non.",
    //     city: "Las Vegas",
    //     dated: "2016-03-12",
    //     last_date: "2016-07-12",
    //     is_featured: "no",
    //     sts: "active",
    //     company_name: "XCV Company",
    //     company_logo: "JOBPORTAL-1457769102.jpg",
    //     company_slug: "xcv-company",
    //     applied: "yes"
    //   },
    //   {
    //     ID: "12",
    //     job_title: "Web Design / Frontend Developer",
    //     job_slug:
    //       "mnf-comapny-jobs-in-new york-web-design-frontend-developer-12",
    //     employer_ID: "11",
    //     company_ID: "11",
    //     job_description:
    //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce venenatis arcu est. Phasellus vel dignissim tellus. Aenean fermentum fermentum convallis. Maecenas vitae ipsum sed risus viverra volutpat non ac sapien. Donec viverra massa at dolor imperdiet hendrerit. Nullam quis est vitae dui placerat posuere. Phasellus eget erat sit amet lacus semper consectetur. Sed a nisi nisi. Pellentesque hendrerit est id quam facilisis auctor a ut ante. Etiam metus arcu, sagittis vitae massa ac, faucibus tempus dolor. Sed et tempus ex. Aliquam interdum erat vel convallis tristique. Phasellus lectus eros, interdum ac sollicitudin vestibulum, scelerisque vitae ligula. Cras aliquam est id velit laoreet, et mattis massa ultrices. Ut aliquam mi nunc, et tempor neque malesuada in.",
    //     city: "New York",
    //     dated: "2016-03-11",
    //     last_date: "2016-07-11",
    //     is_featured: "no",
    //     sts: "active",
    //     company_name: "MNF Comapny",
    //     company_logo: "JOBPORTAL-1457713999.jpg",
    //     company_slug: "mnf-comapny",
    //     applied: "no"
    //   },
    //   {
    //     ID: "10",
    //     job_title: "Front End Developers",
    //     job_slug: "mno-company-jobs-in-new york-front-end-developers-10",
    //     employer_ID: "9",
    //     company_ID: "9",
    //     job_description:
    //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce venenatis arcu est. Phasellus vel dignissim tellus. Aenean fermentum fermentum convallis. Maecenas vitae ipsum sed risus viverra volutpat non ac sapien. Donec viverra massa at dolor imperdiet hendrerit. Nullam quis est vitae dui placerat posuere. Phasellus eget erat sit amet lacus semper consectetur. Sed a nisi nisi. Pellentesque hendrerit est id quam facilisis auctor a ut ante. Etiam metus arcu, sagittis vitae massa ac, faucibus tempus dolor. Sed et tempus ex. Aliquam interdum erat vel convallis tristique. Phasellus lectus eros, interdum ac sollicitudin vestibulum, scelerisque vitae ligula. Cras aliquam est id velit laoreet, et mattis massa ultrices. Ut aliquam mi nunc, et tempor neque malesuada in.",
    //     city: "New York",
    //     dated: "2016-03-11",
    //     last_date: "2016-07-11",
    //     is_featured: "no",
    //     sts: "active",
    //     company_name: "Mno Company",
    //     company_logo: "JOBPORTAL-1457713172.jpg",
    //     company_slug: "mno-company",
    //     applied: "no"
    //   },
    //   {
    //     ID: "9",
    //     job_title: "Graphic Designer",
    //     job_slug: "jkl-company-jobs-in-new york-graphic-designer-9",
    //     employer_ID: "8",
    //     company_ID: "8",
    //     job_description:
    //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce venenatis arcu est. Phasellus vel dignissim tellus. Aenean fermentum fermentum convallis. Maecenas vitae ipsum sed risus viverra volutpat non ac sapien. Donec viverra massa at dolor imperdiet hendrerit. Nullam quis est vitae dui placerat posuere. Phasellus eget erat sit amet lacus semper consectetur. Sed a nisi nisi. Pellentesque hendrerit est id quam facilisis auctor a ut ante. Etiam metus arcu, sagittis vitae massa ac, faucibus tempus dolor. Sed et tempus ex. Aliquam interdum erat vel convallis tristique. Phasellus lectus eros, interdum ac sollicitudin vestibulum, scelerisque vitae ligula. Cras aliquam est id velit laoreet, et mattis massa ultrices. Ut aliquam mi nunc, et tempor neque malesuada in.",
    //     city: "New York",
    //     dated: "2016-03-11",
    //     last_date: "2016-07-11",
    //     is_featured: "no",
    //     sts: "active",
    //     company_name: "Jkl Company",
    //     company_logo: "JOBPORTAL-1457712255.jpg",
    //     company_slug: "jkl-company",
    //     applied: "no"
    //   },
    //   {
    //     ID: "7",
    //     job_title: "Graphic Designer Adobe Indesign Expert",
    //     job_slug:
    //       "def-it-company-jobs-in-new york-graphic-designer-adobe-indesign-expert-7",
    //     employer_ID: "6",
    //     company_ID: "6",
    //     job_description:
    //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce venenatis arcu est. Phasellus vel dignissim tellus. Aenean fermentum fermentum convallis. Maecenas vitae ipsum sed risus viverra volutpat non ac sapien. Donec viverra massa at dolor imperdiet hendrerit. Nullam quis est vitae dui placerat posuere. Phasellus eget erat sit amet lacus semper consectetur. Sed a nisi nisi. Pellentesque hendrerit est id quam facilisis auctor a ut ante. Etiam metus arcu, sagittis vitae massa ac, faucibus tempus dolor. Sed et tempus ex. Aliquam interdum erat vel convallis tristique. Phasellus lectus eros, interdum ac sollicitudin vestibulum, scelerisque vitae ligula. Cras aliquam est id velit laoreet, et mattis massa ultrices. Ut aliquam mi nunc, et tempor neque malesuada in.",
    //     city: "New York",
    //     dated: "2016-03-11",
    //     last_date: "2016-07-11",
    //     is_featured: "no",
    //     sts: "active",
    //     company_name: "Def It Company",
    //     company_logo: "JOBPORTAL-1457711477.jpg",
    //     company_slug: "def-it-company",
    //     applied: "no"
    //   },
    //   {
    //     ID: "6",
    //     job_title: "Head Of Digital Marketing",
    //     job_slug: "abc-it-tech-jobs-in-dubai-head-of-digital-marketing-6",
    //     employer_ID: "5",
    //     company_ID: "5",
    //     job_description:
    //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce venenatis arcu est. Phasellus vel dignissim tellus. Aenean fermentum fermentum convallis. Maecenas vitae ipsum sed risus viverra volutpat non ac sapien. Donec viverra massa at dolor imperdiet hendrerit. Nullam quis est vitae dui placerat posuere. Phasellus eget erat sit amet lacus semper consectetur. Sed a nisi nisi. Pellentesque hendrerit est id quam facilisis auctor a ut ante. Etiam metus arcu, sagittis vitae massa ac, faucibus tempus dolor. Sed et tempus ex. Aliquam interdum erat vel convallis tristique. Phasellus lectus eros, interdum ac sollicitudin vestibulum, scelerisque vitae ligula. Cras aliquam est id velit laoreet, et mattis massa ultrices. Ut aliquam mi nunc, et tempor neque malesuada in.",
    //     city: "Dubai",
    //     dated: "2016-03-11",
    //     last_date: "2016-07-11",
    //     is_featured: "no",
    //     sts: "active",
    //     company_name: "Abc IT Tech",
    //     company_logo: "JOBPORTAL-1457711170.jpg",
    //     company_slug: "abc-it-tech",
    //     applied: "no"
    //   },
    //   {
    //     ID: "5",
    //     job_title: "Front End Developer",
    //     job_slug: "some-it-company-jobs-in-hong kong-front-end-developer-5",
    //     employer_ID: "4",
    //     company_ID: "4",
    //     job_description:
    //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce venenatis arcu est. Phasellus vel dignissim tellus. Aenean fermentum fermentum convallis. Maecenas vitae ipsum sed risus viverra volutpat non ac sapien. Donec viverra massa at dolor imperdiet hendrerit. Nullam quis est vitae dui placerat posuere. Phasellus eget erat sit amet lacus semper consectetur. Sed a nisi nisi. Pellentesque hendrerit est id quam facilisis auctor a ut ante. Etiam metus arcu, sagittis vitae massa ac, faucibus tempus dolor. Sed et tempus ex. Aliquam interdum erat vel convallis tristique. Phasellus lectus eros, interdum ac sollicitudin vestibulum, scelerisque vitae ligula. Cras aliquam est id velit laoreet, et mattis massa ultrices. Ut aliquam mi nunc, et tempor neque malesuada in.",
    //     city: "Hong Kong",
    //     dated: "2016-03-11",
    //     last_date: "2016-07-11",
    //     is_featured: "no",
    //     sts: "active",
    //     company_name: "Some IT company",
    //     company_logo: "JOBPORTAL-1457693358.jpg",
    //     company_slug: "some-it-company",
    //     applied: "no"
    //   },
    //   {
    //     ID: "4",
    //     job_title: "Dot Net Developer",
    //     job_slug: "info-technologies-jobs-in-sydney-dot-net-developer-4",
    //     employer_ID: "3",
    //     company_ID: "3",
    //     job_description:
    //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce venenatis arcu est. Phasellus vel dignissim tellus. Aenean fermentum fermentum convallis. Maecenas vitae ipsum sed risus viverra volutpat non ac sapien. Donec viverra massa at dolor imperdiet hendrerit. Nullam quis est vitae dui placerat posuere. Phasellus eget erat sit amet lacus semper consectetur. Sed a nisi nisi. Pellentesque hendrerit est id quam facilisis auctor a ut ante. Etiam metus arcu, sagittis vitae massa ac, faucibus tempus dolor. Sed et tempus ex. Aliquam interdum erat vel convallis tristique. Phasellus lectus eros, interdum ac sollicitudin vestibulum, scelerisque vitae ligula. Cras aliquam est id velit laoreet, et mattis massa ultrices. Ut aliquam mi nunc, et tempor neque malesuada in.",
    //     city: "Sydney",
    //     dated: "2016-03-11",
    //     last_date: "2016-07-11",
    //     is_featured: "no",
    //     sts: "active",
    //     company_name: "Info Technologies",
    //     company_logo: "JOBPORTAL-1457691226.jpg",
    //     company_slug: "info-technologies",
    //     applied: "no"
    //   }
    // ];

    this.setState({isLoading:true})

    StorageService.get("user").then((resp: any) => {
      let _user: IUser = JSON.parse(resp);
      jobApi.post("matching_jobs", `user_id=${_user.user_id}`, (resp: any) => {
        let jobs = [];
        if(resp && !resp.error && resp.response && resp.response.message && resp.response.message.result){
          jobs = resp.response.message.result;
        }
        this.setState({ jobs: jobs, copyJobs: jobs, isLoading: false });
      });
    });
  }

  getUserInfo() {
    StorageService.get("user").then((resp: any) => {
      let _user: IUser = JSON.parse(resp);
      jobApi.post("my_account", `user_id=${_user.user_id}`, (resp: any) => {
        if (!resp.error) {
          if (
            resp &&
            resp.response &&
            resp.response.message &&
            resp.response.message.row
          ) {
            // console.log('resp.response.message.row: '  ,resp.response.message.row);
            _user = resp.response.message.row;
            _user.user_id = _user.ID;
            _user.user_email = _user.email;
            _user.first_name = _user.full_name;
            StorageService.set("user", JSON.stringify(_user)).then(() => {});
          }
        }
      });
    });
  }
}
