// Code generated by protoc-gen-go. DO NOT EDIT.
// source: rpc.proto

package pb

import (
	context "context"
	fmt "fmt"
	proto "github.com/golang/protobuf/proto"
	grpc "google.golang.org/grpc"
	math "math"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.ProtoPackageIsVersion3 // please upgrade the proto package

type Error struct {
	// TODO: Change to Error Codes Enum
	Message              string   `protobuf:"bytes,1,opt,name=message,proto3" json:"message,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *Error) Reset()         { *m = Error{} }
func (m *Error) String() string { return proto.CompactTextString(m) }
func (*Error) ProtoMessage()    {}
func (*Error) Descriptor() ([]byte, []int) {
	return fileDescriptor_77a6da22d6a3feb1, []int{0}
}

func (m *Error) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_Error.Unmarshal(m, b)
}
func (m *Error) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_Error.Marshal(b, m, deterministic)
}
func (m *Error) XXX_Merge(src proto.Message) {
	xxx_messageInfo_Error.Merge(m, src)
}
func (m *Error) XXX_Size() int {
	return xxx_messageInfo_Error.Size(m)
}
func (m *Error) XXX_DiscardUnknown() {
	xxx_messageInfo_Error.DiscardUnknown(m)
}

var xxx_messageInfo_Error proto.InternalMessageInfo

func (m *Error) GetMessage() string {
	if m != nil {
		return m.Message
	}
	return ""
}

type BlockRequest struct {
	// Types that are valid to be assigned to BlockIdentifier:
	//	*BlockRequest_BlockId
	//	*BlockRequest_BlockNumber
	BlockIdentifier      isBlockRequest_BlockIdentifier `protobuf_oneof:"block_identifier"`
	XXX_NoUnkeyedLiteral struct{}                       `json:"-"`
	XXX_unrecognized     []byte                         `json:"-"`
	XXX_sizecache        int32                          `json:"-"`
}

func (m *BlockRequest) Reset()         { *m = BlockRequest{} }
func (m *BlockRequest) String() string { return proto.CompactTextString(m) }
func (*BlockRequest) ProtoMessage()    {}
func (*BlockRequest) Descriptor() ([]byte, []int) {
	return fileDescriptor_77a6da22d6a3feb1, []int{1}
}

func (m *BlockRequest) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_BlockRequest.Unmarshal(m, b)
}
func (m *BlockRequest) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_BlockRequest.Marshal(b, m, deterministic)
}
func (m *BlockRequest) XXX_Merge(src proto.Message) {
	xxx_messageInfo_BlockRequest.Merge(m, src)
}
func (m *BlockRequest) XXX_Size() int {
	return xxx_messageInfo_BlockRequest.Size(m)
}
func (m *BlockRequest) XXX_DiscardUnknown() {
	xxx_messageInfo_BlockRequest.DiscardUnknown(m)
}

var xxx_messageInfo_BlockRequest proto.InternalMessageInfo

type isBlockRequest_BlockIdentifier interface {
	isBlockRequest_BlockIdentifier()
}

type BlockRequest_BlockId struct {
	BlockId []byte `protobuf:"bytes,1,opt,name=block_id,json=blockId,proto3,oneof"`
}

type BlockRequest_BlockNumber struct {
	BlockNumber uint64 `protobuf:"varint,2,opt,name=block_number,json=blockNumber,proto3,oneof"`
}

func (*BlockRequest_BlockId) isBlockRequest_BlockIdentifier() {}

func (*BlockRequest_BlockNumber) isBlockRequest_BlockIdentifier() {}

func (m *BlockRequest) GetBlockIdentifier() isBlockRequest_BlockIdentifier {
	if m != nil {
		return m.BlockIdentifier
	}
	return nil
}

func (m *BlockRequest) GetBlockId() []byte {
	if x, ok := m.GetBlockIdentifier().(*BlockRequest_BlockId); ok {
		return x.BlockId
	}
	return nil
}

func (m *BlockRequest) GetBlockNumber() uint64 {
	if x, ok := m.GetBlockIdentifier().(*BlockRequest_BlockNumber); ok {
		return x.BlockNumber
	}
	return 0
}

// XXX_OneofWrappers is for the internal use of the proto package.
func (*BlockRequest) XXX_OneofWrappers() []interface{} {
	return []interface{}{
		(*BlockRequest_BlockId)(nil),
		(*BlockRequest_BlockNumber)(nil),
	}
}

type BlockReply struct {
	Block                *Block   `protobuf:"bytes,1,opt,name=block,proto3" json:"block,omitempty"`
	Error                *Error   `protobuf:"bytes,2,opt,name=error,proto3" json:"error,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *BlockReply) Reset()         { *m = BlockReply{} }
func (m *BlockReply) String() string { return proto.CompactTextString(m) }
func (*BlockReply) ProtoMessage()    {}
func (*BlockReply) Descriptor() ([]byte, []int) {
	return fileDescriptor_77a6da22d6a3feb1, []int{2}
}

func (m *BlockReply) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_BlockReply.Unmarshal(m, b)
}
func (m *BlockReply) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_BlockReply.Marshal(b, m, deterministic)
}
func (m *BlockReply) XXX_Merge(src proto.Message) {
	xxx_messageInfo_BlockReply.Merge(m, src)
}
func (m *BlockReply) XXX_Size() int {
	return xxx_messageInfo_BlockReply.Size(m)
}
func (m *BlockReply) XXX_DiscardUnknown() {
	xxx_messageInfo_BlockReply.DiscardUnknown(m)
}

var xxx_messageInfo_BlockReply proto.InternalMessageInfo

func (m *BlockReply) GetBlock() *Block {
	if m != nil {
		return m.Block
	}
	return nil
}

func (m *BlockReply) GetError() *Error {
	if m != nil {
		return m.Error
	}
	return nil
}

type BlockHeaderRequest struct {
	// Types that are valid to be assigned to BlockIdentifier:
	//	*BlockHeaderRequest_BlockId
	//	*BlockHeaderRequest_BlockNumber
	BlockIdentifier      isBlockHeaderRequest_BlockIdentifier `protobuf_oneof:"block_identifier"`
	XXX_NoUnkeyedLiteral struct{}                             `json:"-"`
	XXX_unrecognized     []byte                               `json:"-"`
	XXX_sizecache        int32                                `json:"-"`
}

func (m *BlockHeaderRequest) Reset()         { *m = BlockHeaderRequest{} }
func (m *BlockHeaderRequest) String() string { return proto.CompactTextString(m) }
func (*BlockHeaderRequest) ProtoMessage()    {}
func (*BlockHeaderRequest) Descriptor() ([]byte, []int) {
	return fileDescriptor_77a6da22d6a3feb1, []int{3}
}

func (m *BlockHeaderRequest) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_BlockHeaderRequest.Unmarshal(m, b)
}
func (m *BlockHeaderRequest) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_BlockHeaderRequest.Marshal(b, m, deterministic)
}
func (m *BlockHeaderRequest) XXX_Merge(src proto.Message) {
	xxx_messageInfo_BlockHeaderRequest.Merge(m, src)
}
func (m *BlockHeaderRequest) XXX_Size() int {
	return xxx_messageInfo_BlockHeaderRequest.Size(m)
}
func (m *BlockHeaderRequest) XXX_DiscardUnknown() {
	xxx_messageInfo_BlockHeaderRequest.DiscardUnknown(m)
}

var xxx_messageInfo_BlockHeaderRequest proto.InternalMessageInfo

type isBlockHeaderRequest_BlockIdentifier interface {
	isBlockHeaderRequest_BlockIdentifier()
}

type BlockHeaderRequest_BlockId struct {
	BlockId []byte `protobuf:"bytes,1,opt,name=block_id,json=blockId,proto3,oneof"`
}

type BlockHeaderRequest_BlockNumber struct {
	BlockNumber uint64 `protobuf:"varint,2,opt,name=block_number,json=blockNumber,proto3,oneof"`
}

func (*BlockHeaderRequest_BlockId) isBlockHeaderRequest_BlockIdentifier() {}

func (*BlockHeaderRequest_BlockNumber) isBlockHeaderRequest_BlockIdentifier() {}

func (m *BlockHeaderRequest) GetBlockIdentifier() isBlockHeaderRequest_BlockIdentifier {
	if m != nil {
		return m.BlockIdentifier
	}
	return nil
}

func (m *BlockHeaderRequest) GetBlockId() []byte {
	if x, ok := m.GetBlockIdentifier().(*BlockHeaderRequest_BlockId); ok {
		return x.BlockId
	}
	return nil
}

func (m *BlockHeaderRequest) GetBlockNumber() uint64 {
	if x, ok := m.GetBlockIdentifier().(*BlockHeaderRequest_BlockNumber); ok {
		return x.BlockNumber
	}
	return 0
}

// XXX_OneofWrappers is for the internal use of the proto package.
func (*BlockHeaderRequest) XXX_OneofWrappers() []interface{} {
	return []interface{}{
		(*BlockHeaderRequest_BlockId)(nil),
		(*BlockHeaderRequest_BlockNumber)(nil),
	}
}

type BlockHeaderReply struct {
	BlockHeader          *BlockHeader `protobuf:"bytes,1,opt,name=block_header,json=blockHeader,proto3" json:"block_header,omitempty"`
	Error                *Error       `protobuf:"bytes,2,opt,name=error,proto3" json:"error,omitempty"`
	XXX_NoUnkeyedLiteral struct{}     `json:"-"`
	XXX_unrecognized     []byte       `json:"-"`
	XXX_sizecache        int32        `json:"-"`
}

func (m *BlockHeaderReply) Reset()         { *m = BlockHeaderReply{} }
func (m *BlockHeaderReply) String() string { return proto.CompactTextString(m) }
func (*BlockHeaderReply) ProtoMessage()    {}
func (*BlockHeaderReply) Descriptor() ([]byte, []int) {
	return fileDescriptor_77a6da22d6a3feb1, []int{4}
}

func (m *BlockHeaderReply) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_BlockHeaderReply.Unmarshal(m, b)
}
func (m *BlockHeaderReply) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_BlockHeaderReply.Marshal(b, m, deterministic)
}
func (m *BlockHeaderReply) XXX_Merge(src proto.Message) {
	xxx_messageInfo_BlockHeaderReply.Merge(m, src)
}
func (m *BlockHeaderReply) XXX_Size() int {
	return xxx_messageInfo_BlockHeaderReply.Size(m)
}
func (m *BlockHeaderReply) XXX_DiscardUnknown() {
	xxx_messageInfo_BlockHeaderReply.DiscardUnknown(m)
}

var xxx_messageInfo_BlockHeaderReply proto.InternalMessageInfo

func (m *BlockHeaderReply) GetBlockHeader() *BlockHeader {
	if m != nil {
		return m.BlockHeader
	}
	return nil
}

func (m *BlockHeaderReply) GetError() *Error {
	if m != nil {
		return m.Error
	}
	return nil
}

// Request for a ndoe to look up the status and value of a transaction.
type TransactionLookupRequest struct {
	// Unique transaction identifier.
	Id                   uint64   `protobuf:"varint,1,opt,name=id,proto3" json:"id,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *TransactionLookupRequest) Reset()         { *m = TransactionLookupRequest{} }
func (m *TransactionLookupRequest) String() string { return proto.CompactTextString(m) }
func (*TransactionLookupRequest) ProtoMessage()    {}
func (*TransactionLookupRequest) Descriptor() ([]byte, []int) {
	return fileDescriptor_77a6da22d6a3feb1, []int{5}
}

func (m *TransactionLookupRequest) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_TransactionLookupRequest.Unmarshal(m, b)
}
func (m *TransactionLookupRequest) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_TransactionLookupRequest.Marshal(b, m, deterministic)
}
func (m *TransactionLookupRequest) XXX_Merge(src proto.Message) {
	xxx_messageInfo_TransactionLookupRequest.Merge(m, src)
}
func (m *TransactionLookupRequest) XXX_Size() int {
	return xxx_messageInfo_TransactionLookupRequest.Size(m)
}
func (m *TransactionLookupRequest) XXX_DiscardUnknown() {
	xxx_messageInfo_TransactionLookupRequest.DiscardUnknown(m)
}

var xxx_messageInfo_TransactionLookupRequest proto.InternalMessageInfo

func (m *TransactionLookupRequest) GetId() uint64 {
	if m != nil {
		return m.Id
	}
	return 0
}

// Response to lookup request.
type TransactionLookupResponse struct {
	// Final transaction written to the blockchain.
	Transaction *AcceptedTransaction `protobuf:"bytes,1,opt,name=transaction,proto3" json:"transaction,omitempty"`
	// Current status of the transaction.
	Status TransactionStatus `protobuf:"varint,2,opt,name=status,proto3,enum=pb.TransactionStatus" json:"status,omitempty"`
	// Human readable information to help understand the transaction status.
	StatusInfo string `protobuf:"bytes,3,opt,name=status_info,json=statusInfo,proto3" json:"status_info,omitempty"`
	// Result of the transaction execution.
	Result               []byte   `protobuf:"bytes,4,opt,name=result,proto3" json:"result,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *TransactionLookupResponse) Reset()         { *m = TransactionLookupResponse{} }
func (m *TransactionLookupResponse) String() string { return proto.CompactTextString(m) }
func (*TransactionLookupResponse) ProtoMessage()    {}
func (*TransactionLookupResponse) Descriptor() ([]byte, []int) {
	return fileDescriptor_77a6da22d6a3feb1, []int{6}
}

func (m *TransactionLookupResponse) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_TransactionLookupResponse.Unmarshal(m, b)
}
func (m *TransactionLookupResponse) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_TransactionLookupResponse.Marshal(b, m, deterministic)
}
func (m *TransactionLookupResponse) XXX_Merge(src proto.Message) {
	xxx_messageInfo_TransactionLookupResponse.Merge(m, src)
}
func (m *TransactionLookupResponse) XXX_Size() int {
	return xxx_messageInfo_TransactionLookupResponse.Size(m)
}
func (m *TransactionLookupResponse) XXX_DiscardUnknown() {
	xxx_messageInfo_TransactionLookupResponse.DiscardUnknown(m)
}

var xxx_messageInfo_TransactionLookupResponse proto.InternalMessageInfo

func (m *TransactionLookupResponse) GetTransaction() *AcceptedTransaction {
	if m != nil {
		return m.Transaction
	}
	return nil
}

func (m *TransactionLookupResponse) GetStatus() TransactionStatus {
	if m != nil {
		return m.Status
	}
	return TransactionStatus_TX_UNKNOWN
}

func (m *TransactionLookupResponse) GetStatusInfo() string {
	if m != nil {
		return m.StatusInfo
	}
	return ""
}

func (m *TransactionLookupResponse) GetResult() []byte {
	if m != nil {
		return m.Result
	}
	return nil
}

// Message sent to a node to submit a transaction.
type TransactionSubmitRequest struct {
	Transaction          *SignedTransaction `protobuf:"bytes,1,opt,name=transaction,proto3" json:"transaction,omitempty"`
	XXX_NoUnkeyedLiteral struct{}           `json:"-"`
	XXX_unrecognized     []byte             `json:"-"`
	XXX_sizecache        int32              `json:"-"`
}

func (m *TransactionSubmitRequest) Reset()         { *m = TransactionSubmitRequest{} }
func (m *TransactionSubmitRequest) String() string { return proto.CompactTextString(m) }
func (*TransactionSubmitRequest) ProtoMessage()    {}
func (*TransactionSubmitRequest) Descriptor() ([]byte, []int) {
	return fileDescriptor_77a6da22d6a3feb1, []int{7}
}

func (m *TransactionSubmitRequest) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_TransactionSubmitRequest.Unmarshal(m, b)
}
func (m *TransactionSubmitRequest) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_TransactionSubmitRequest.Marshal(b, m, deterministic)
}
func (m *TransactionSubmitRequest) XXX_Merge(src proto.Message) {
	xxx_messageInfo_TransactionSubmitRequest.Merge(m, src)
}
func (m *TransactionSubmitRequest) XXX_Size() int {
	return xxx_messageInfo_TransactionSubmitRequest.Size(m)
}
func (m *TransactionSubmitRequest) XXX_DiscardUnknown() {
	xxx_messageInfo_TransactionSubmitRequest.DiscardUnknown(m)
}

var xxx_messageInfo_TransactionSubmitRequest proto.InternalMessageInfo

func (m *TransactionSubmitRequest) GetTransaction() *SignedTransaction {
	if m != nil {
		return m.Transaction
	}
	return nil
}

// Response from a node from a transaction Request.
type TransactionSubmitResponse struct {
	// Final transaction written to the blockchain. (if successful)
	Transaction *AcceptedTransaction `protobuf:"bytes,1,opt,name=transaction,proto3" json:"transaction,omitempty"`
	// Current status of the transaction.
	Status TransactionStatus `protobuf:"varint,2,opt,name=status,proto3,enum=pb.TransactionStatus" json:"status,omitempty"`
	// Human readable information to help understand the transaction status.
	StatusInfo string `protobuf:"bytes,3,opt,name=status_info,json=statusInfo,proto3" json:"status_info,omitempty"`
	// Result of the transaction execution.
	Result               []byte   `protobuf:"bytes,4,opt,name=result,proto3" json:"result,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *TransactionSubmitResponse) Reset()         { *m = TransactionSubmitResponse{} }
func (m *TransactionSubmitResponse) String() string { return proto.CompactTextString(m) }
func (*TransactionSubmitResponse) ProtoMessage()    {}
func (*TransactionSubmitResponse) Descriptor() ([]byte, []int) {
	return fileDescriptor_77a6da22d6a3feb1, []int{8}
}

func (m *TransactionSubmitResponse) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_TransactionSubmitResponse.Unmarshal(m, b)
}
func (m *TransactionSubmitResponse) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_TransactionSubmitResponse.Marshal(b, m, deterministic)
}
func (m *TransactionSubmitResponse) XXX_Merge(src proto.Message) {
	xxx_messageInfo_TransactionSubmitResponse.Merge(m, src)
}
func (m *TransactionSubmitResponse) XXX_Size() int {
	return xxx_messageInfo_TransactionSubmitResponse.Size(m)
}
func (m *TransactionSubmitResponse) XXX_DiscardUnknown() {
	xxx_messageInfo_TransactionSubmitResponse.DiscardUnknown(m)
}

var xxx_messageInfo_TransactionSubmitResponse proto.InternalMessageInfo

func (m *TransactionSubmitResponse) GetTransaction() *AcceptedTransaction {
	if m != nil {
		return m.Transaction
	}
	return nil
}

func (m *TransactionSubmitResponse) GetStatus() TransactionStatus {
	if m != nil {
		return m.Status
	}
	return TransactionStatus_TX_UNKNOWN
}

func (m *TransactionSubmitResponse) GetStatusInfo() string {
	if m != nil {
		return m.StatusInfo
	}
	return ""
}

func (m *TransactionSubmitResponse) GetResult() []byte {
	if m != nil {
		return m.Result
	}
	return nil
}

// Message used for deploying a contract.
type ContractDeployRequest struct {
	Contract             *SignedContract `protobuf:"bytes,1,opt,name=contract,proto3" json:"contract,omitempty"`
	XXX_NoUnkeyedLiteral struct{}        `json:"-"`
	XXX_unrecognized     []byte          `json:"-"`
	XXX_sizecache        int32           `json:"-"`
}

func (m *ContractDeployRequest) Reset()         { *m = ContractDeployRequest{} }
func (m *ContractDeployRequest) String() string { return proto.CompactTextString(m) }
func (*ContractDeployRequest) ProtoMessage()    {}
func (*ContractDeployRequest) Descriptor() ([]byte, []int) {
	return fileDescriptor_77a6da22d6a3feb1, []int{9}
}

func (m *ContractDeployRequest) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_ContractDeployRequest.Unmarshal(m, b)
}
func (m *ContractDeployRequest) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_ContractDeployRequest.Marshal(b, m, deterministic)
}
func (m *ContractDeployRequest) XXX_Merge(src proto.Message) {
	xxx_messageInfo_ContractDeployRequest.Merge(m, src)
}
func (m *ContractDeployRequest) XXX_Size() int {
	return xxx_messageInfo_ContractDeployRequest.Size(m)
}
func (m *ContractDeployRequest) XXX_DiscardUnknown() {
	xxx_messageInfo_ContractDeployRequest.DiscardUnknown(m)
}

var xxx_messageInfo_ContractDeployRequest proto.InternalMessageInfo

func (m *ContractDeployRequest) GetContract() *SignedContract {
	if m != nil {
		return m.Contract
	}
	return nil
}

// Message used for replying to a contract deployment request.
type ContractDeployResponse struct {
	// Final contract stored to the blockchain. (if successful)
	Contract *AcceptedContract `protobuf:"bytes,1,opt,name=contract,proto3" json:"contract,omitempty"`
	// Current status of the contract.
	Status ContractStatus `protobuf:"varint,2,opt,name=status,proto3,enum=pb.ContractStatus" json:"status,omitempty"`
	// Human readable information to help understand the contract status.
	StatusInfo           string   `protobuf:"bytes,3,opt,name=status_info,json=statusInfo,proto3" json:"status_info,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *ContractDeployResponse) Reset()         { *m = ContractDeployResponse{} }
func (m *ContractDeployResponse) String() string { return proto.CompactTextString(m) }
func (*ContractDeployResponse) ProtoMessage()    {}
func (*ContractDeployResponse) Descriptor() ([]byte, []int) {
	return fileDescriptor_77a6da22d6a3feb1, []int{10}
}

func (m *ContractDeployResponse) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_ContractDeployResponse.Unmarshal(m, b)
}
func (m *ContractDeployResponse) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_ContractDeployResponse.Marshal(b, m, deterministic)
}
func (m *ContractDeployResponse) XXX_Merge(src proto.Message) {
	xxx_messageInfo_ContractDeployResponse.Merge(m, src)
}
func (m *ContractDeployResponse) XXX_Size() int {
	return xxx_messageInfo_ContractDeployResponse.Size(m)
}
func (m *ContractDeployResponse) XXX_DiscardUnknown() {
	xxx_messageInfo_ContractDeployResponse.DiscardUnknown(m)
}

var xxx_messageInfo_ContractDeployResponse proto.InternalMessageInfo

func (m *ContractDeployResponse) GetContract() *AcceptedContract {
	if m != nil {
		return m.Contract
	}
	return nil
}

func (m *ContractDeployResponse) GetStatus() ContractStatus {
	if m != nil {
		return m.Status
	}
	return ContractStatus_CT_UNKNOWN
}

func (m *ContractDeployResponse) GetStatusInfo() string {
	if m != nil {
		return m.StatusInfo
	}
	return ""
}

func init() {
	proto.RegisterType((*Error)(nil), "pb.Error")
	proto.RegisterType((*BlockRequest)(nil), "pb.BlockRequest")
	proto.RegisterType((*BlockReply)(nil), "pb.BlockReply")
	proto.RegisterType((*BlockHeaderRequest)(nil), "pb.BlockHeaderRequest")
	proto.RegisterType((*BlockHeaderReply)(nil), "pb.BlockHeaderReply")
	proto.RegisterType((*TransactionLookupRequest)(nil), "pb.TransactionLookupRequest")
	proto.RegisterType((*TransactionLookupResponse)(nil), "pb.TransactionLookupResponse")
	proto.RegisterType((*TransactionSubmitRequest)(nil), "pb.TransactionSubmitRequest")
	proto.RegisterType((*TransactionSubmitResponse)(nil), "pb.TransactionSubmitResponse")
	proto.RegisterType((*ContractDeployRequest)(nil), "pb.ContractDeployRequest")
	proto.RegisterType((*ContractDeployResponse)(nil), "pb.ContractDeployResponse")
}

func init() { proto.RegisterFile("rpc.proto", fileDescriptor_77a6da22d6a3feb1) }

var fileDescriptor_77a6da22d6a3feb1 = []byte{
	// 590 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0xd4, 0x55, 0x4d, 0x6f, 0xd3, 0x4c,
	0x10, 0x4e, 0xd2, 0x34, 0x6d, 0x26, 0x91, 0xdf, 0x74, 0xd5, 0xe6, 0x75, 0x03, 0xa8, 0xc5, 0x5c,
	0xaa, 0x4a, 0x44, 0x28, 0x48, 0x20, 0x6e, 0x90, 0x82, 0x9a, 0x48, 0x50, 0xa1, 0x0d, 0xf7, 0xca,
	0x1f, 0x9b, 0xd4, 0xd4, 0xf1, 0x2e, 0xeb, 0xf5, 0x21, 0xfd, 0x23, 0xfc, 0x1b, 0xfe, 0x15, 0x77,
	0xe4, 0xfd, 0x48, 0xfc, 0x91, 0x0a, 0x7a, 0xe0, 0xc0, 0xcd, 0x33, 0xfb, 0xcc, 0x33, 0xf3, 0xcc,
	0xce, 0xac, 0xa1, 0xcd, 0x99, 0x3f, 0x64, 0x9c, 0x0a, 0x8a, 0x1a, 0xcc, 0x1b, 0x1c, 0x08, 0xee,
	0xc6, 0x89, 0xeb, 0x8b, 0x90, 0xc6, 0xca, 0x3d, 0xb0, 0x7c, 0x1a, 0x0b, 0xee, 0xfa, 0x42, 0xdb,
	0x1d, 0x2f, 0xa2, 0xfe, 0xad, 0x36, 0xba, 0x37, 0xc4, 0x0d, 0x08, 0x57, 0x96, 0xf3, 0x14, 0x76,
	0x3f, 0x70, 0x4e, 0x39, 0xb2, 0x61, 0x6f, 0x49, 0x92, 0xc4, 0x5d, 0x10, 0xbb, 0x7e, 0x5a, 0x3f,
	0x6b, 0x63, 0x63, 0x3a, 0x01, 0x74, 0xc7, 0x59, 0x3c, 0x26, 0xdf, 0x52, 0x92, 0x08, 0xf4, 0x08,
	0xf6, 0x25, 0xdf, 0x75, 0x18, 0x48, 0x68, 0x77, 0x52, 0xc3, 0x7b, 0xd2, 0x33, 0x0d, 0xd0, 0x33,
	0xe8, 0xaa, 0xc3, 0x38, 0x5d, 0x7a, 0x84, 0xdb, 0x8d, 0xd3, 0xfa, 0x59, 0x73, 0x52, 0xc3, 0xaa,
	0x84, 0x2b, 0xe9, 0x1c, 0x23, 0xe8, 0x19, 0x06, 0x12, 0x8b, 0x70, 0x1e, 0x12, 0xee, 0x5c, 0x01,
	0xe8, 0x2c, 0x2c, 0x5a, 0xa1, 0x13, 0xd8, 0x95, 0x08, 0x99, 0xa0, 0x33, 0x6a, 0x0f, 0x99, 0x37,
	0x54, 0xc7, 0xca, 0x9f, 0x01, 0x48, 0x56, 0xb7, 0x4c, 0xa0, 0x01, 0x52, 0x08, 0x56, 0x7e, 0xe7,
	0x2b, 0x20, 0x19, 0x30, 0x91, 0x6a, 0xff, 0x6e, 0xed, 0x0b, 0xe8, 0x15, 0x72, 0x65, 0x0a, 0x46,
	0x86, 0x4c, 0xb5, 0x5b, 0x0b, 0xf9, 0x6f, 0x2d, 0x44, 0x63, 0x15, 0xb7, 0x32, 0x7e, 0x2f, 0xea,
	0x1c, 0xec, 0x2f, 0x9b, 0xdb, 0xfe, 0x48, 0xe9, 0x6d, 0xca, 0x8c, 0x34, 0x0b, 0x1a, 0x5a, 0x54,
	0x13, 0x37, 0xc2, 0xc0, 0xf9, 0x51, 0x87, 0xe3, 0x2d, 0xe0, 0x84, 0xd1, 0x38, 0x21, 0xe8, 0x0d,
	0x74, 0x72, 0x73, 0xa3, 0xab, 0xfb, 0x3f, 0x4b, 0xf8, 0xce, 0xf7, 0x09, 0x13, 0x24, 0xc8, 0xc5,
	0xe2, 0x3c, 0x16, 0x3d, 0x87, 0x56, 0x22, 0x5c, 0x91, 0x26, 0xb2, 0x4c, 0x6b, 0x74, 0x94, 0x45,
	0xe5, 0xd0, 0x33, 0x79, 0x88, 0x35, 0x08, 0x9d, 0x40, 0x47, 0x7d, 0x5d, 0x87, 0xf1, 0x9c, 0xda,
	0x3b, 0x72, 0xb8, 0x40, 0xb9, 0xa6, 0xf1, 0x9c, 0xa2, 0x3e, 0xb4, 0x38, 0x49, 0xd2, 0x48, 0xd8,
	0xcd, 0xec, 0x46, 0xb0, 0xb6, 0x9c, 0x59, 0x41, 0xec, 0x2c, 0xf5, 0x96, 0xa1, 0x30, 0x62, 0x5f,
	0x6f, 0x2b, 0x5f, 0x16, 0x32, 0x0b, 0x17, 0xf1, 0xfd, 0xc5, 0x97, 0xbb, 0x62, 0x58, 0xff, 0x9d,
	0xae, 0x5c, 0xc2, 0xd1, 0x85, 0xde, 0xee, 0xf7, 0x84, 0x45, 0x74, 0x65, 0x5a, 0x32, 0x84, 0x7d,
	0xb3, 0xf6, 0xba, 0x70, 0xb4, 0xe9, 0x87, 0x09, 0xc1, 0x6b, 0x8c, 0xf3, 0xbd, 0x0e, 0xfd, 0x32,
	0x93, 0x6e, 0xc3, 0x8b, 0x0a, 0xd5, 0x61, 0xbe, 0x07, 0x55, 0x32, 0x74, 0x5e, 0x52, 0x2f, 0x53,
	0x1b, 0xdc, 0x03, 0xa5, 0x8f, 0x7e, 0xee, 0x40, 0xf7, 0x93, 0x7b, 0x77, 0xe7, 0x72, 0x2a, 0x6e,
	0xf0, 0xe7, 0x0b, 0x84, 0xe1, 0xa0, 0x72, 0x67, 0xe8, 0x71, 0xb9, 0xc1, 0xf9, 0x01, 0x19, 0x3c,
	0xb9, 0xe7, 0x54, 0x29, 0x74, 0x6a, 0x25, 0x4e, 0xb5, 0x1d, 0x15, 0xce, 0xc2, 0x86, 0x55, 0x38,
	0x8b, 0x2b, 0xe5, 0xd4, 0xb2, 0x2b, 0xb8, 0x24, 0x42, 0xae, 0x37, 0xea, 0x6d, 0x9e, 0x2c, 0x1d,
	0x6e, 0xe5, 0x3c, 0x2c, 0x5a, 0x39, 0x35, 0xf4, 0x0a, 0x7a, 0x06, 0x3f, 0x5e, 0xa9, 0xf7, 0xe5,
	0x8f, 0xe2, 0xde, 0x82, 0x65, 0xe2, 0xf4, 0xcb, 0xd1, 0x2f, 0xbf, 0x2b, 0x3a, 0xf6, 0xb0, 0xe2,
	0x57, 0x0c, 0x13, 0xe8, 0x17, 0x19, 0xd6, 0xf9, 0x1f, 0xca, 0x34, 0x05, 0xab, 0x38, 0x45, 0xe8,
	0x38, 0x7f, 0xf7, 0x85, 0x19, 0x1d, 0x0c, 0xb6, 0x1d, 0x99, 0xf6, 0x79, 0x2d, 0xf9, 0x4b, 0x7a,
	0xf9, 0x2b, 0x00, 0x00, 0xff, 0xff, 0xb1, 0x39, 0xbc, 0x0b, 0xe1, 0x06, 0x00, 0x00,
}

// Reference imports to suppress errors if they are not otherwise used.
var _ context.Context
var _ grpc.ClientConn

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
const _ = grpc.SupportPackageIsVersion4

// MazzarothRPCClient is the client API for MazzarothRPC service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://godoc.org/google.golang.org/grpc#ClientConn.NewStream.
type MazzarothRPCClient interface {
	TransactionSubmit(ctx context.Context, in *TransactionSubmitRequest, opts ...grpc.CallOption) (*TransactionSubmitResponse, error)
	TransactionLookup(ctx context.Context, in *TransactionLookupRequest, opts ...grpc.CallOption) (*TransactionLookupResponse, error)
	GetBlock(ctx context.Context, in *BlockRequest, opts ...grpc.CallOption) (*BlockReply, error)
	GetBlockByNumber(ctx context.Context, in *BlockRequest, opts ...grpc.CallOption) (*BlockReply, error)
	GetBlockHeader(ctx context.Context, in *BlockHeaderRequest, opts ...grpc.CallOption) (*BlockHeaderReply, error)
	GetBlockHeaderByNumber(ctx context.Context, in *BlockHeaderRequest, opts ...grpc.CallOption) (*BlockHeaderReply, error)
	ContractDeploy(ctx context.Context, in *ContractDeployRequest, opts ...grpc.CallOption) (*ContractDeployResponse, error)
}

type mazzarothRPCClient struct {
	cc *grpc.ClientConn
}

func NewMazzarothRPCClient(cc *grpc.ClientConn) MazzarothRPCClient {
	return &mazzarothRPCClient{cc}
}

func (c *mazzarothRPCClient) TransactionSubmit(ctx context.Context, in *TransactionSubmitRequest, opts ...grpc.CallOption) (*TransactionSubmitResponse, error) {
	out := new(TransactionSubmitResponse)
	err := c.cc.Invoke(ctx, "/pb.MazzarothRPC/TransactionSubmit", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *mazzarothRPCClient) TransactionLookup(ctx context.Context, in *TransactionLookupRequest, opts ...grpc.CallOption) (*TransactionLookupResponse, error) {
	out := new(TransactionLookupResponse)
	err := c.cc.Invoke(ctx, "/pb.MazzarothRPC/TransactionLookup", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *mazzarothRPCClient) GetBlock(ctx context.Context, in *BlockRequest, opts ...grpc.CallOption) (*BlockReply, error) {
	out := new(BlockReply)
	err := c.cc.Invoke(ctx, "/pb.MazzarothRPC/GetBlock", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *mazzarothRPCClient) GetBlockByNumber(ctx context.Context, in *BlockRequest, opts ...grpc.CallOption) (*BlockReply, error) {
	out := new(BlockReply)
	err := c.cc.Invoke(ctx, "/pb.MazzarothRPC/GetBlockByNumber", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *mazzarothRPCClient) GetBlockHeader(ctx context.Context, in *BlockHeaderRequest, opts ...grpc.CallOption) (*BlockHeaderReply, error) {
	out := new(BlockHeaderReply)
	err := c.cc.Invoke(ctx, "/pb.MazzarothRPC/GetBlockHeader", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *mazzarothRPCClient) GetBlockHeaderByNumber(ctx context.Context, in *BlockHeaderRequest, opts ...grpc.CallOption) (*BlockHeaderReply, error) {
	out := new(BlockHeaderReply)
	err := c.cc.Invoke(ctx, "/pb.MazzarothRPC/GetBlockHeaderByNumber", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *mazzarothRPCClient) ContractDeploy(ctx context.Context, in *ContractDeployRequest, opts ...grpc.CallOption) (*ContractDeployResponse, error) {
	out := new(ContractDeployResponse)
	err := c.cc.Invoke(ctx, "/pb.MazzarothRPC/ContractDeploy", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// MazzarothRPCServer is the server API for MazzarothRPC service.
type MazzarothRPCServer interface {
	TransactionSubmit(context.Context, *TransactionSubmitRequest) (*TransactionSubmitResponse, error)
	TransactionLookup(context.Context, *TransactionLookupRequest) (*TransactionLookupResponse, error)
	GetBlock(context.Context, *BlockRequest) (*BlockReply, error)
	GetBlockByNumber(context.Context, *BlockRequest) (*BlockReply, error)
	GetBlockHeader(context.Context, *BlockHeaderRequest) (*BlockHeaderReply, error)
	GetBlockHeaderByNumber(context.Context, *BlockHeaderRequest) (*BlockHeaderReply, error)
	ContractDeploy(context.Context, *ContractDeployRequest) (*ContractDeployResponse, error)
}

func RegisterMazzarothRPCServer(s *grpc.Server, srv MazzarothRPCServer) {
	s.RegisterService(&_MazzarothRPC_serviceDesc, srv)
}

func _MazzarothRPC_TransactionSubmit_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(TransactionSubmitRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MazzarothRPCServer).TransactionSubmit(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/pb.MazzarothRPC/TransactionSubmit",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MazzarothRPCServer).TransactionSubmit(ctx, req.(*TransactionSubmitRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _MazzarothRPC_TransactionLookup_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(TransactionLookupRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MazzarothRPCServer).TransactionLookup(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/pb.MazzarothRPC/TransactionLookup",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MazzarothRPCServer).TransactionLookup(ctx, req.(*TransactionLookupRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _MazzarothRPC_GetBlock_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(BlockRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MazzarothRPCServer).GetBlock(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/pb.MazzarothRPC/GetBlock",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MazzarothRPCServer).GetBlock(ctx, req.(*BlockRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _MazzarothRPC_GetBlockByNumber_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(BlockRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MazzarothRPCServer).GetBlockByNumber(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/pb.MazzarothRPC/GetBlockByNumber",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MazzarothRPCServer).GetBlockByNumber(ctx, req.(*BlockRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _MazzarothRPC_GetBlockHeader_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(BlockHeaderRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MazzarothRPCServer).GetBlockHeader(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/pb.MazzarothRPC/GetBlockHeader",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MazzarothRPCServer).GetBlockHeader(ctx, req.(*BlockHeaderRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _MazzarothRPC_GetBlockHeaderByNumber_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(BlockHeaderRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MazzarothRPCServer).GetBlockHeaderByNumber(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/pb.MazzarothRPC/GetBlockHeaderByNumber",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MazzarothRPCServer).GetBlockHeaderByNumber(ctx, req.(*BlockHeaderRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _MazzarothRPC_ContractDeploy_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(ContractDeployRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(MazzarothRPCServer).ContractDeploy(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/pb.MazzarothRPC/ContractDeploy",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(MazzarothRPCServer).ContractDeploy(ctx, req.(*ContractDeployRequest))
	}
	return interceptor(ctx, in, info, handler)
}

var _MazzarothRPC_serviceDesc = grpc.ServiceDesc{
	ServiceName: "pb.MazzarothRPC",
	HandlerType: (*MazzarothRPCServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "TransactionSubmit",
			Handler:    _MazzarothRPC_TransactionSubmit_Handler,
		},
		{
			MethodName: "TransactionLookup",
			Handler:    _MazzarothRPC_TransactionLookup_Handler,
		},
		{
			MethodName: "GetBlock",
			Handler:    _MazzarothRPC_GetBlock_Handler,
		},
		{
			MethodName: "GetBlockByNumber",
			Handler:    _MazzarothRPC_GetBlockByNumber_Handler,
		},
		{
			MethodName: "GetBlockHeader",
			Handler:    _MazzarothRPC_GetBlockHeader_Handler,
		},
		{
			MethodName: "GetBlockHeaderByNumber",
			Handler:    _MazzarothRPC_GetBlockHeaderByNumber_Handler,
		},
		{
			MethodName: "ContractDeploy",
			Handler:    _MazzarothRPC_ContractDeploy_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "rpc.proto",
}
