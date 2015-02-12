var ID = ["%PIX-6-302005", "%PIX-4-106023", "%PIX-6-106015", "%PIX-6-302006", "%PIX-6-305003", "%PIX-6-302001", "%PIX-6-302002", "%PIX-5-109012", "%PIX-5-304001"];
var MSG= [
    "Built UDP connection for faddr 198.207.223.240/53337 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Built UDP connection for faddr 198.207.223.240/3842 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Built UDP connection for faddr 198.207.223.240/36205 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Deny icmp src outside:Some-Cisco dst inside:10.0.0.187 (type 3",
    "Deny TCP (no connection) from 192.168.0.2/2794 to 192.168.216.1/2357 flags SYN ACK on interface inside",
    "Teardown UDP connection for faddr 192.168.245.1/137 gaddr 10.0.0.187/2789 laddr 192.168.0.2/2789 ()",
    "Teardown UDP connection for faddr 192.168.110.1/137 gaddr 10.0.0.187/2790 laddr 192.168.0.2/2790 ()",
    "Teardown UDP connection for faddr 198.207.223.240/53337 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Built UDP connection for faddr 194.224.52.6/36455 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Built UDP connection for faddr 194.224.52.4/44549 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Built UDP connection for faddr 80.58.34.99/32772 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Built UDP connection for faddr 80.132.253.64/14791 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Teardown UDP connection for faddr 80.132.253.64/14791 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Built UDP connection for faddr 80.58.4.34/37074 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Teardown UDP connection for faddr 198.207.223.240/3842 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Teardown UDP connection for faddr 198.207.223.240/36205 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Teardown UDP connection for faddr 194.224.52.6/36455 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Teardown UDP connection for faddr 194.224.52.4/44549 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Teardown UDP connection for faddr 80.58.34.99/32772 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Teardown UDP connection for faddr 80.58.4.34/37074 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Teardown translation for global 10.0.0.188 local 192.168.0.6",
    "Built UDP connection for faddr 193.192.160.244/3053 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Teardown UDP connection for faddr 193.192.160.244/3053 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Built UDP connection for faddr 66.196.65.40/51250 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Built outbound TCP connection 152017 for faddr 212.56.240.37/9200 gaddr 10.0.0.187/2795 laddr 192.168.0.2/2795 ()",
    "Built UDP connection for faddr 217.160.131.171/1030 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Teardown UDP connection for faddr 217.160.131.171/1030 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Teardown UDP connection for faddr 217.160.131.171/1030 gaddr 10.0.0.187/53 laddr 192.168.0.2/53 ()",
    "Built inbound TCP connection 152022 for faddr 217.160.131.171/4336 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Teardown UDP connection for faddr 194.64.31.12/59988 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Built UDP connection for faddr 195.70.224.45/33064 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Teardown UDP connection for faddr 195.70.224.45/33064 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Built UDP connection for faddr 62.189.34.82/32914 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Teardown UDP connection for faddr 62.189.34.82/32914 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Built UDP connection for faddr 62.189.94.209/61016 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Teardown UDP connection for faddr 62.189.94.209/61016 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Built UDP connection for faddr 195.129.12.114/62096 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Teardown UDP connection for faddr 195.129.12.114/62096 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Built UDP connection for faddr 194.114.201.13/48355 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Built UDP connection for faddr 203.124.140.107/12519 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Built UDP connection for faddr 203.124.140.107/12520 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Built UDP connection for faddr 195.146.160.3/16708 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Deny TCP (no connection) from 192.168.0.2/2796 to 192.168.80.1/1719 flags SYN ACK on interface inside",
    "Built UDP connection for faddr 194.114.201.14/46474 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Teardown UDP connection for faddr 194.114.201.14/46474 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Teardown UDP connection for faddr 194.114.201.13/48355 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Teardown UDP connection for faddr 192.168.202.1/137 gaddr 10.0.0.187/2791 laddr 192.168.0.2/2791 ()",
    "Teardown UDP connection for faddr 192.42.93.30/10550 gaddr 10.0.0.187/1059 laddr 192.168.0.2/1059 ()",
    "Teardown UDP connection for faddr 137.65.1.1/10550 gaddr 10.0.0.187/1059 laddr 192.168.0.2/1059 ()",
    "Teardown UDP connection for faddr 66.196.65.40/51250 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Teardown TCP connection 152022 faddr 217.160.131.171/4336 gaddr 10.0.0.187/53 laddr 192.168.0.2/53 duration 0:00:32 bytes 68 (TCP FINs)",
    "Teardown UDP connection for faddr 193.108.91.93/6463 gaddr 10.0.0.187/1059 laddr 192.168.0.2/1059 ()",
    "Teardown UDP connection for faddr 192.42.93.30/6464 gaddr 10.0.0.187/1059 laddr 192.168.0.2/1059 ()",
    "Teardown UDP connection for faddr 192.42.93.30/2383 gaddr 10.0.0.187/1059 laddr 192.168.0.2/1059 ()",
    "Teardown UDP connection for faddr 216.52.17.52/6464 gaddr 10.0.0.187/1059 laddr 192.168.0.2/1059 ()",
    "Authen Session End: user ''",
    "Built UDP connection for faddr 194.25.0.125/38729 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Built outbound TCP connection 152054 for faddr 66.102.9.99/80 gaddr 10.0.0.187/56669 laddr 192.168.0.2/56669",
    "192.168.0.2 Accessed URL 66.102.9.99:/",
    "Built outbound TCP connection 152055 for faddr 66.102.9.104/80 gaddr 10.0.0.187/56670 laddr 192.168.0.2/56670",
    "192.168.0.2 Accessed URL 66.102.9.104:/",
    "Built UDP connection for faddr 211.9.32.235/32770 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Teardown UDP connection for faddr 211.9.32.235/32770 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Built outbound TCP connection 152058 for faddr 130.57.4.27/80 gaddr 10.0.0.187/56672 laddr 192.168.0.2/56672",
    "192.168.0.2 Accessed URL 130.57.4.27:/",
    "Built outbound TCP connection 152060 for faddr 130.57.4.27/80 gaddr 10.0.0.187/56673 laddr 192.168.0.2/56673",
    "192.168.0.2 Accessed URL 130.57.4.27:/inc/hdr_script_common.js",
    "Teardown TCP connection 152060 faddr 130.57.4.27/80 gaddr 10.0.0.187/56673 laddr 192.168.0.2/56673 duration 0:00:01 bytes 11143 (TCP Reset-I)",
    "Teardown TCP connection 152058 faddr 130.57.4.27/80 gaddr 10.0.0.187/56672 laddr 192.168.0.2/56672 duration 0:00:02 bytes 11641 (TCP Reset-I)",
    "Built outbound TCP connection 152062 for faddr 130.57.4.27/80 gaddr 10.0.0.187/56674 laddr 192.168.0.2/56674",
    "192.168.0.2 Accessed URL 130.57.4.27:/de-de/",
    "Teardown UDP connection for faddr 203.124.140.107/12519 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Built outbound TCP connection 152064 for faddr 130.57.4.27/80 gaddr 10.0.0.187/56675 laddr 192.168.0.2/56675",
    "192.168.0.2 Accessed URL 130.57.4.27:/common/inc/novell_style.css",
    "Built UDP connection for faddr 194.25.0.69/49933 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Built UDP connection for faddr 195.235.113.3/14809 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Built UDP connection for faddr 195.235.113.3/18429 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Teardown UDP connection for faddr 192.168.216.1/137 gaddr 10.0.0.187/2793 laddr 192.168.0.2/2793",
    "Teardown UDP connection for faddr 203.124.140.107/12520 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Teardown UDP connection for faddr 195.146.160.3/16708 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Teardown TCP connection 152017 faddr 212.56.240.37/9200 gaddr 10.0.0.187/2795 laddr 192.168.0.2/2795 duration 0:01:03 bytes 33424 (TCP FINs)",
    "Teardown UDP connection for faddr 194.25.0.125/38729 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Built outbound TCP connection 152070 for faddr 216.52.17.116/80 gaddr 10.0.0.187/56677 laddr 192.168.0.2/56677",
    "192.168.0.2 Accessed URL 216.52.17.116:/b/ss/novellcom/0/G.1-XP-R/s14102280031206?[AQB]&ndh=1&t=29/2/2004%2012%3A20%3A20%201%20-120&ch=www.novell.com/de-de/&server=www.novell.com&eVarCFG=200-200-200--&c5=de-de%3Ad",
    "Teardown TCP connection 152070 faddr 216.52.17.116/80 gaddr 10.0.0.187/56677 laddr 192.168.0.2/56677 duration 0:00:01 bytes 1551 (TCP Reset-I)",
    "Built outbound TCP connection 152071 for faddr 216.52.17.116/80 gaddr 10.0.0.187/56678 laddr 192.168.0.2/56678",
    "192.168.0.2 Accessed URL 216.52.17.116:/b/ss/novellcom/0/G.1-XP-R/s14102280031206?[AQB]purl=http%3A%2F%2Fwww.novell.com%2Fde-de%2F&pccr=true&&ndh=1&t=29/2/2004%2012%3A20%3A20%201%20-120&ch=www.novell.com/de-de/&se",
    "Teardown TCP connection 152071 faddr 216.52.17.116/80 gaddr 10.0.0.187/56678 laddr 192.168.0.2/56678 duration 0:00:01 bytes 1329 (TCP Reset-I)",
    "Built UDP connection for faddr 192.168.202.1/137 gaddr 10.0.0.187/2797 laddr 192.168.0.2/2797",
    "Built UDP connection for faddr 192.168.216.1/137 gaddr 10.0.0.187/2798 laddr 192.168.0.2/2798",
    "Built UDP connection for faddr 209.120.214.162/32769 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Teardown UDP connection for faddr 209.120.214.162/32769 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Deny TCP (no connection) from 192.168.0.2/2799 to 192.168.202.1/2244 flags SYN ACK on interface inside",
    "Built UDP connection for faddr 66.246.44.108/59213 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Teardown UDP connection for faddr 66.246.44.108/59213 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Teardown TCP connection 151958 faddr 212.227.109.224/80 gaddr 10.0.0.187/56614 laddr 192.168.0.2/56614 duration 0:04:56 bytes 11069 (TCP Reset-I)",
    "Teardown TCP connection 151957 faddr 212.227.109.224/80 gaddr 10.0.0.187/56613 laddr 192.168.0.2/56613 duration 0:04:56 bytes 11069 (TCP Reset-I)",
    "Built outbound TCP connection 152082 for faddr 212.227.109.224/80 gaddr 10.0.0.187/56683 laddr 192.168.0.2/56683",
    "Built outbound TCP connection 152083 for faddr 212.227.109.224/80 gaddr 10.0.0.187/56684 laddr 192.168.0.2/56684",
    "192.168.0.2 Accessed URL 212.227.109.224:/stylelib/Microsites.css",
    "192.168.0.2 Accessed URL 212.227.109.224:/scriptlib/ClientStdScripts.js",
    "Teardown UDP connection for faddr 194.25.0.69/49933 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Teardown UDP connection for faddr 195.235.113.3/14809 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "Teardown UDP connection for faddr 195.235.113.3/18429 gaddr 10.0.0.187/53 laddr 192.168.0.2/53"
];

for(var i =0;i<500;i++){
    var item = {
        'identifier':ID[Math.floor(Math.random()*ID.length)],
        'message':MSG[Math.floor(Math.random()*MSG.length)],
        'time':new Date(),
        'TIMESTAMP':new Date()
    };
    db.logs.insert(item);
}